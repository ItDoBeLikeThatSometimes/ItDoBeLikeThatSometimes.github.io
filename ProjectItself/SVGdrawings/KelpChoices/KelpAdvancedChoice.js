class KelpAdvancedChoices {
    constructor(xyPlot) {
        this.circlesInHulls = new Set();
        this.xyPlot = xyPlot;
        this.container = xyPlot.plotArea;
        this.data = null;
        this.dataString = null;
        this.width = 899.48;
        this.height = 725;


    

        // Define the scaling functions
        this.xScale = d3.scaleLinear().range([0, this.width]);
        this.yScale = d3.scaleLinear().range([this.height, 0]);

        
    }

    initializePlots() {
        this.container.append('image')
            .attr('href', 'Pictures/PictureofEuropaNice.PNG')
            .attr('width', this.container.attr('width'))
            .attr('height', this.container.attr('height'))
            .attr('x', 0)
            .attr('y', 0);
    }


    
    returnNewDataInstance(){
        return this.newDataInstance
    }



    updatePlots(data, dataString) {

        this.dataString = dataString
        this.newDataInstance = accumulator.getSpecificDataSet(dataString)
        this.newDataInstance.getGroupToColorMap()

        
        



        // Validate and log data structure
        this.data = data.map(d => {
            //console.log('Original data object:', d);
            if (!d.hasOwnProperty('group')) {
                console.error('Data object is missing group property:', d);
                d.group = 'UndefinedGroup'; // Assign a default group if missing
            }
            return d;
        });
    
        
    
        // Update the domains of the scales based on the data
        this.xScale.domain([0, d3.max(this.data, d => d.x)]);
        this.yScale.domain([0, d3.max(this.data, d => d.y)]);
    
        this.container.selectAll("circle.main")
            .data(this.data)
            .join(
                enter => enter.append("circle")
                    .attr("class", "main")
                    .attr("r", 5) // hard coded
                    .attr("data-group", d => {
                        //console.log('Data object:', d);
                        return d.group;
                    })
                    .attr("fill", d => {
                        const group = d.group;
                        //console.log('Processing group:', group);
                        const color = this.newDataInstance.returnColorfromGroupMap(group)
                        //console.log(`Color for group ${group}:`, color);
                        return color;
                    })
                    .attr("cx", d => this.xyPlot.xScale(d.x))
                    .attr("cy", d => this.xyPlot.yScale(d.y))
                    .attr("id", (d, i) => i)
                    .attr("hullID", d => d.country + d.country)
                    .attr("country", d => d.country),
                update => update
                    .attr("cx", d => this.xyPlot.xScale(d.x))
                    .attr("cy", d => this.xyPlot.yScale(d.y)),
                exit => exit.remove()
            );
    }
    

    // Custom deep copy function to handle circular references
    deepCopy(obj, cache = new Map()) {
        if (typeof obj !== 'object' || obj === null) {
            return obj; // Return non-objects or null as is
        }

        if (cache.has(obj)) {
            return cache.get(obj); // Return cached copy if circular reference is detected
        }

        const result = Array.isArray(obj) ? [] : {};
        cache.set(obj, result); // Cache the copy before recursion

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                result[key] = this.deepCopy(obj[key], cache);
            }
        }

        return result;
    }

    starterPack(data, dataString,  sliderDistance) {
        this.updatePlots(data, dataString);
        const lithWithPaths = this.shortestPathCalculator();

        //console.log("ListWithPaths is ", lithWithPaths)

        


        const deletedPaths = this.drawConvexHulls(sliderDistance, lithWithPaths, this.container);

        const listWithGroups = this.creatingAListWithAvailableGroups(this.container);
        for (let i = 0; i < listWithGroups.length; i++) {
            this.blobbyPathCreator(deletedPaths, listWithGroups[i]);
        }
    }

    clearVisuals() {
        this.container.selectAll("path").remove(); // Clear all paths drawn previously
        this.container.selectAll("circle.insideCircles").remove(); // Clear all inside circles drawn previously
    }

    drawConvexHulls(maxDistanceSlider, lithWithPaths, container) {
        const groupedPoints = new Map();
        const hulls = [];


        var colorGroupMachine = this.returnNewDataInstance()
        
        

        // Group points by color
        for (const d of this.data) {  //ErrorProne, this.data

            const scaledX = this.xyPlot.xScale(d.x);
            const scaledY = this.xyPlot.yScale(d.y);

            var colorGroupMachineElement = colorGroupMachine.returnColorfromGroupMap(d.group)

            if (!groupedPoints.has(colorGroupMachineElement)) {
                //console.log("In method drawConvexHulls, group is ", colorGroupMachineElement)
                groupedPoints.set(colorGroupMachineElement, []);
            }
            groupedPoints.get(colorGroupMachineElement).push([scaledX, scaledY, d.country]);
        }

        const maxDistanceBetweenPoints = maxDistanceSlider;
        const byGrouplistWithGroupedPoints = [];

        for (const [color, points] of groupedPoints.entries()) {
            const numPoints = points.length;
            const connections = Array.from({ length: numPoints }, () => []);
            const visited = new Array(numPoints).fill(false);

            // Build connections based on distance
            for (let index = 0; index < numPoints; index++) {
                const pointA = points[index];
                for (let i = index + 1; i < numPoints; i++) {
                    const pointB = points[i];
                    if (calculateDistance(pointA[0], pointA[1], pointB[0], pointB[1]) <= maxDistanceBetweenPoints) {
                        connections[index].push(i);
                        connections[i].push(index);
                    }
                }
            }

            // Find all components using DFS
            for (let index = 0; index < numPoints; index++) {
                if (!visited[index]) {
                    const component = dfs(points, visited, index, connections);
                    byGrouplistWithGroupedPoints.push({ group: color, points: component });
                }
            }
        }

        for (const groupInfo of byGrouplistWithGroupedPoints) {
            const { group, points } = groupInfo;

            // Only compute convex hulls if there are at least 3 points
            if (points.length >= 3) {
                const featureCollection = turf.featureCollection(points.map(p => turf.point([p[0], p[1]])));
                const hull = turf.convex(featureCollection);
                if (hull) {
                    hulls.push({ hull, color: group });
                }
            }
        }

        const updatedListWithPaths = this.deleteUnnecessaryPaths(hulls, lithWithPaths);
        //Test updatedListWithPaths
        //console.log("updatedListWithPaths is ", updatedListWithPaths)
        //Test updatedListWithPaths
        return this.pointsInsideConvexHull(updatedListWithPaths, container);
    }

    deleteUnnecessaryPaths(hulls, lithWithPaths) {
        const identifyingListWithPaths = this.deepCopy(lithWithPaths);
        const circleCache = new Map();
        
        // Cache circle data for quick lookup
        d3.selectAll("circle").each(function() {
            const circle = d3.select(this);
            circleCache.set(circle.attr("id"), {
                cx: +circle.attr("cx"),
                cy: +circle.attr("cy"),
                country: circle.attr("country")
            });
        });

        const getCircleDataById = (circleId) => circleCache.get(circleId);
        const getCircleIdByCoordinates = (x, y) => {
            for (const [id, data] of circleCache.entries()) {
                if (data.cx === x && data.cy === y) return id;
            }
            return null;
        };

        for (let groupIndex = 0; groupIndex < lithWithPaths.length; groupIndex++) {
            const groupColor = lithWithPaths[groupIndex];
            const actualList = groupColor[0];
            const color = groupColor[1];
            const currentColorHulls = choosingSpecificHull(hulls, color);

            // //Test> currentColorHulls
            // console.log("CurrentColorHulls is ", currentColorHulls)
            // //Test> currentColorHulls

            for (let elementIndex = 0; elementIndex < actualList.length; elementIndex++) {
                const element = actualList[elementIndex];
                const fromCircle = getCircleDataById(element.fromNode);

                // //Test> fromCircle is
                // console.log("fromCircle is ", fromCircle)
                // //Test> fromCircle is

                const toCircle = getCircleDataById(element.toNode);
                let pathRemoved = false;

                for (const currentColorHull of currentColorHulls) {
                    if (pathRemoved) break;

                    const isFromCircleInHullCheck = isPointInSpecificHull(fromCircle.cx, fromCircle.cy, currentColorHull);
                    const isToCircleInHullCheck = isPointInSpecificHull(toCircle.cx, toCircle.cy, currentColorHull);

                    if (isFromCircleInHullCheck && isToCircleInHullCheck) {
                        const pathSelector = `path[from-to="${fromCircle.country},${toCircle.country}"]`;
                        d3.selectAll(pathSelector).remove();

                        const hullCoordinates = currentColorHull.hull.geometry.coordinates[0];
                        //Current hullCoordinates
                        //console.log("hullCoordinates is ", hullCoordinates)  
                        //Current hullCoordinates

                        //Testing each element from hullCoordinates

                        const circleIdsInHull = hullCoordinates.map(coord => getCircleIdByCoordinates(coord[0], coord[1]));
                        //Current circleIdsInHull
                        //console.log(" Current circleIdsInHull are ",circleIdsInHull)
                        //Current circleIdsInHull
                        identifyingListWithPaths[groupIndex][0] = identifyingListWithPaths[groupIndex][0].map(item => {
                            if (item.fromNode === element.fromNode && item.toNode === element.toNode) {
                                item.edgeInTheConcreteHull = circleIdsInHull;
                            }
                            return item;
                        });

                        pathRemoved = true;
                    }
                }
            }
        }

        return identifyingListWithPaths;
    }

    pointsInsideConvexHull(listWithPaths, container) {
        const copiedListWithPaths = this.deepCopy(listWithPaths);

        const circleCache = new Map();

        // Cache circle data for quick lookup
        d3.selectAll("circle").each(function() {
            const circle = d3.select(this);
            
            // //Test> Circle
            // console.log("Circle id is ", circle.attr("id") )
            // //Test> Circle 
            
            circleCache.set(circle.attr("id"), {
                cx: +circle.attr("cx"),
                cy: +circle.attr("cy")
            });

        }); 

        const getCircleDataById = (circleId) => circleCache.get(circleId);
        
        //Test> circleCache
        // console.log("CircleCache", circleCache.get(0)) Undefined for now
        //Test> circleCache

        for (let groupIndex = 0; groupIndex < listWithPaths.length; groupIndex++) {
            const groupColor = listWithPaths[groupIndex];
            const actualList = groupColor[0];
            for (let elementIndex = 0; elementIndex < actualList.length; elementIndex++) {
                const element = actualList[elementIndex];
            
                //Test> Element
                // console.log("Element edgeInTheConcreteHull ", element.edgeInTheConcreteHull)
                //Test> Element

                if (element.edgeInTheConcreteHull != null) {
                    const listWithConvexHullEdges = element.edgeInTheConcreteHull;

                    const boundaryPoints = listWithConvexHullEdges.map(circleId => {
                        const data = getCircleDataById(circleId);
                        return [data.cx, data.cy];
                    });

                    const delaunay = d3.Delaunay.from(boundaryPoints);
                    const triangles = delaunay.triangles;

                    const triangleCoords = [];
                    for (let i = 0; i < triangles.length; i += 3) {
                        triangleCoords.push([
                            boundaryPoints[triangles[i]],
                            boundaryPoints[triangles[i + 1]],
                            boundaryPoints[triangles[i + 2]]
                        ]);
                    }

                    const generatePointsInTriangle = (triangle, step) => {
                        const [A, B, C] = triangle;
                        const points = [];
                        const minX = Math.min(A[0], B[0], C[0]);
                        const maxX = Math.max(A[0], B[0], C[0]);
                        const minY = Math.min(A[1], B[1], C[1]);
                        const maxY = Math.max(A[1], B[1], C[1]);
                        for (let x = minX; x < maxX; x += step) {
                            for (let y = minY; y < maxY; y += step) {
                                const p = [x, y];
                                if (turf.booleanPointInPolygon(turf.point(p), turf.polygon([[A, B, C, A]]))) {
                                    points.push(p);
                                }
                            }
                        }
                        return points;
                    };

                    const allPoints = [];
                    for (const triangle of triangleCoords) {
                        allPoints.push(...generatePointsInTriangle(triangle, 24)); // Adjust step as needed
                    }

                    if (copiedListWithPaths[groupIndex] && copiedListWithPaths[groupIndex][0] && copiedListWithPaths[groupIndex][0][elementIndex]) {
                        copiedListWithPaths[groupIndex][0][elementIndex].pointsInsideConvexHull = allPoints;
                    }
                }
            }
        }

        return copiedListWithPaths;
    }
    
    shortestPathCalculator() {

        var dataInstance = this.returnNewDataInstance()
        
        //Testing dataInstance 
        //console.log("DataInstance colorMap is " , dataInstance.getGroupToColorMap())
        //Testing dataInstance


        var listWithMSTPaths = [];

        var listWithGroups = [];

        let allNodes = [];

        this.container.selectAll("circle").data(this.data).nodes().forEach(function(circleNode) {
            var circle = d3.select(circleNode);
            var group = circle.attr("data-group")
            var colorFromGroup = dataInstance.returnColorfromGroupMap(group)
            if (!listWithGroups.includes(colorFromGroup)) {
                listWithGroups.push(colorFromGroup);
            }
        });

        listWithGroups.forEach((eachGroup) => {
            this.graph = new Graph(this.container, eachGroup, this.data, this.dataString);
            this.graph.createNodes();
            this.graph.createEdges();

            var selectCircleById = (yourCircleId) => {
                // Assuming this.kelpContainer is your D3 selection of the container
                return this.container.select("[id='" + yourCircleId + "']");
            };

            this.graph.antiCollisionAlgorithmInitializator();

            this.spa = new ShortestPathAlgorithm(this.container, this.graph);

            var mst = this.spa.minimumSpanningTree();

            allNodes = allNodes.concat(this.graph.getNodes().map(node => {
                var circle = selectCircleById(node);
                return {
                    x: parseFloat(circle.attr("cx")),
                    y: parseFloat(circle.attr("cy")),
                    color: eachGroup
                };
            }));

            for (var i = 0; mst.length > i; i++) {
                var fromNode = selectCircleById(mst[i].fromNode);
                var toNode = selectCircleById(mst[i].toNode);
                var color = eachGroup;
                var listWithPotentialPaths = mst[i].potentialExtraPaths;

                if (listWithPotentialPaths.length > 0) {
                    var fromNodeX = fromNode.attr("cx");
                    var fromNodeY = fromNode.attr("cy");

                    var toNodeX = toNode.attr("cx");
                    var toNodeY = toNode.attr("cy");

                    var fromNodeElement = [fromNodeX, fromNodeY, 0];
                    var toNodeElement = [toNodeX, toNodeY, 0];

                    var updatedMstPaths = [fromNodeElement].concat(listWithPotentialPaths, [toNodeElement]);

                    updatedMstPaths.forEach((element) => {
                        element[0] = element[0].toString();
                        element[1] = element[1].toString();
                    });

                    for (var j = 0; j < updatedMstPaths.length - 1; j++) {
                        if (updatedMstPaths[j + 1] != null) {
                            var x1 = parseFloat(updatedMstPaths[j][0]), y1 = parseFloat(updatedMstPaths[j][1]);
                            var x2 = parseFloat(updatedMstPaths[j + 1][0]), y2 = parseFloat(updatedMstPaths[j + 1][1]);

                            // Assuming each node is drawn as a circle with a certain radius
                            var nodeRadius = 2; // Adjust based on your actual node size

                            // Calculate direction vector components and their normalized values for offset calculation
                            var dx = x2 - x1;
                            var dy = y2 - y1;
                            var dist = Math.sqrt(dx * dx + dy * dy);
                            var unitX = dx / dist;
                            var unitY = dy / dist;

                            // Calculate offsets to place control points around the node's circumference
                            var offsetX = unitY * nodeRadius; // Perpendicular to the direction vector
                            var offsetY = -unitX * nodeRadius;

                            // Control points around the first node
                            var controlX1 = x1 - offsetX, controlY1 = y1 - offsetY;
                            var controlX2 = x1 + offsetX, controlY2 = y1 + offsetY;

                            // Control points around the second node
                            var controlX3 = x2 + offsetX, controlY3 = y2 + offsetY;
                            var controlX4 = x2 - offsetX, controlY4 = y2 - offsetY;

                            // this.container.append("path")
                            //     .attr("d", `M${controlX1},${controlY1}
                            //                 C${x1 - offsetX * 0.5},${y1 - offsetY * 0.5} ${x1 + offsetX * 0.5},${y1 + offsetY * 0.5} ${controlX2},${controlY2}
                            //                 L${controlX3},${controlY3}
                            //                 C${x2 + offsetX * 0.5},${y2 + offsetY * 0.5} ${x2 - offsetX * 0.5},${y2 - offsetY * 0.5} ${controlX4},${controlY4}
                            //                 Z`)
                            //     .attr("stroke", color)
                            //     .attr("stroke-width", 0.5)
                            //     .attr("fill", color)
                            //     .attr("fill-opacity", 0.7)
                            //     .attr("from-to", [fromNode.attr("country"), toNode.attr("country")]);
                        }
                    }
                } else {
                    var x1 = parseFloat(fromNode.attr("cx")), y1 = parseFloat(fromNode.attr("cy"));
                    var x2 = parseFloat(toNode.attr("cx")), y2 = parseFloat(toNode.attr("cy"));

                    // Assuming each node is drawn as a circle with a certain radius
                    var nodeRadius = 2; // Adjust this based on your actual node size

                    // Calculate direction vector components and their normalized values for offset calculation
                    var dx = x2 - x1;
                    var dy = y2 - y1;
                    var dist = Math.sqrt(dx * dx + dy * dy);
                    var unitX = dx / dist;
                    var unitY = dy / dist;

                    // Calculate offsets to place control points around the node's circumference
                    var offsetX = unitY * nodeRadius; // Perpendicular to the direction vector
                    var offsetY = -unitX * nodeRadius;

                    // Control points around the first node
                    var controlX1 = x1 - offsetX, controlY1 = y1 - offsetY;
                    var controlX2 = x1 + offsetX, controlY2 = y1 + offsetY;

                    // Control points around the second node
                    var controlX3 = x2 + offsetX, controlY3 = y2 + offsetY;
                    var controlX4 = x2 - offsetX, controlY4 = y2 - offsetY;

                    // Create paths that form arcs around each node, connecting them with smooth curves
                    // this.container.append("path")
                    //     .attr("d", `M${controlX1},${controlY1}
                    //                 C${x1 - offsetX * 0.5},${y1 - offsetY * 0.5} ${x1 + offsetX * 0.5},${y1 + offsetY * 0.5} ${controlX2},${controlY2}
                    //                 L${controlX3},${controlY3}
                    //                 C${x2 + offsetX * 0.5},${y2 + offsetY * 0.5} ${x2 - offsetX * 0.5},${y2 - offsetY * 0.5} ${controlX4},${controlY4}
                    //                 Z`)
                    //     .attr("stroke", color)
                    //     .attr("stroke-width", 0.5)
                    //     .attr("fill", color)
                    //     .attr("fill-opacity", 0.7)
                    //     .attr("from-to", [fromNode.attr("country"), toNode.attr("country")]);
                }
            }

            listWithMSTPaths.push([mst, eachGroup]);
        });

        return listWithMSTPaths;
    }

    blobbyPathCreator(listWithThePaths, color) {

        //Test> listWithThePaths from blobbyPathCreator
        //console.log("ListWithThePaths at the beginning from blobbyPathCreator is ", listWithThePaths)
        //Test> listWithThePaths from blobbyPathCreator



        listWithThePaths = listWithThePaths.filter((element) => element[1] === color).map(element => element[0]);

    
        listWithThePaths = listWithThePaths[0];


        //Test> listWithThePaths from blobbyPathCreator
        //console.log("ListWithThePaths from blobbyPathCreator is ", listWithThePaths)
        //Test> listWithThePaths from blobbyPathCreator

        const nodePositions = this.creatingANodePositionObject(this.container, color);
        //console.log("StartNode is ", nodePositions)

        // Create an adjacency list for the graph
        const adjacencyList = {};

        listWithThePaths.forEach(({ fromNode, toNode, pointsInsideConvexHull }) => {
            //console.log("PointsInsideConvexHull" , pointsInsideConvexHull)
            if (!adjacencyList[fromNode]) {
                adjacencyList[fromNode] = [];
            }
            if (!adjacencyList[toNode]) {
                adjacencyList[toNode] = [];
            }
            adjacencyList[fromNode].push({ node: toNode, edge: `${fromNode}-${toNode}`, pointsInsideConvexHull });
            adjacencyList[toNode].push({ node: fromNode, edge: `${toNode}-${fromNode}`, pointsInsideConvexHull }); // Treat as undirected
        });

        // Traverse all edges, covering all arms
        function traverseAllEdges(startNode) {
            const visitedEdges = new Set();
            const points = [];
            const convexHullCache = new Map();
            let currentPointsInsideConvexHull = null;

            function traverse(node) {
                points.push({ id: node, x: nodePositions[node].x, y: nodePositions[node].y });

                adjacencyList[node].forEach(neighbor => {
                    const edge = `${node}-${neighbor.node}`;
                    const reverseEdge = `${neighbor.node}-${node}`;

                    if (!visitedEdges.has(edge) && !visitedEdges.has(reverseEdge)) {
                        if (neighbor.pointsInsideConvexHull && neighbor.pointsInsideConvexHull.length > 0) {
                            const hullKey = JSON.stringify(neighbor.pointsInsideConvexHull);
                            if (!convexHullCache.has(hullKey)) {
                                convexHullCache.set(hullKey, neighbor.pointsInsideConvexHull);
                                neighbor.pointsInsideConvexHull.forEach(point => {
                                    points.push({ id: `ch-${node}-${neighbor.node}`, x: point[0], y: point[1] });
                                });
                            }
                            currentPointsInsideConvexHull = neighbor.pointsInsideConvexHull;
                        }

                        visitedEdges.add(edge);
                        visitedEdges.add(reverseEdge);
                        traverse(neighbor.node);
                        points.push({ id: node, x: nodePositions[node].x, y: nodePositions[node].y }); // Return to the current node to cover other arms
                    }
                });
            }

            traverse(startNode);
            return points;
        }

        // Start traversal from the smallest node
        
        const startNode = Object.keys(nodePositions).reduce((a, b) => nodePositions[a].x < nodePositions[b].x ? a : b);
        const points = traverseAllEdges(startNode);

        // Create new data with additional invisible points around each original point
        const extendedData = points.reduce((acc, point) => {
            acc.push(point);
            const offset = 20; // Distance for the additional circles
            // Add four additional circles at 90-degree positions
            acc.push({ id: point.id, x: point.x + offset, y: point.y });
            acc.push({ id: point.id, x: point.x - offset, y: point.y });
            acc.push({ id: point.id, x: point.x, y: point.y + offset });
            acc.push({ id: point.id, x: point.x, y: point.y - offset });
            return acc;
        }, []);

        // Function to generate hull points with random displacement
        function generateHullPoints(points, offset, displacement) {
            const hullPointsUp = [];
            const hullPointsDown = [];
            for (let i = 0; i < points.length - 1; i++) {
                const p1 = points[i];
                const p2 = points[i + 1];
                const normal = calculateNormalVector(p1, p2);
                const numPoints = 10; // Number of interpolated points
                const interpolatedPoints = interpolatePoints(p1, p2, numPoints);

                interpolatedPoints.forEach((p, j) => {
                    const displacementFactorUp = 1 + (Math.random() - 0.5) * displacement;
                    const displacementFactorDown = 1 + (Math.random() - 0.5) * displacement;
                    hullPointsUp.push({
                        x: p.x + normal.nx * offset * displacementFactorUp + Math.random() * 5,
                        y: p.y + normal.ny * offset * displacementFactorUp + Math.random() * 5
                    });
                    hullPointsDown.push({
                        x: p.x - normal.nx * offset * displacementFactorDown + Math.random() * 5,
                        y: p.y - normal.ny * offset * displacementFactorDown + Math.random() * 5
                    });
                });
            }
            return { hullPointsUp, hullPointsDown };
        }

        // Generate hull points
        const offset = 10;  // Increased offset to ensure the path is larger
        const displacement = 1.5; // Decreased displacement for less randomness
        const { hullPointsUp, hullPointsDown } = generateHullPoints(extendedData, offset, displacement);

        // Include start and end points
        hullPointsUp.unshift({ x: points[0].x, y: points[0].y + offset });
        hullPointsDown.push({ x: points[points.length - 1].x, y: points[points.length - 1].y - offset });

        // Combine hull points and reverse the down points for closed path
        const combinedData = [...hullPointsUp, ...hullPointsDown.reverse()];

        // Create line generator for closed path
        const line = d3.line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(d3.curveBasisClosed);  // Use a smooth, closed curve

        // Draw the blobby path
        this.container.append("path")
            .datum(combinedData)
            .attr("class", "tube")
            .attr("d", line)
            .attr("fill", color)
            .attr("opacity", 0.5);

        // Draw the graph edges
        listWithThePaths.forEach(({ fromNode, toNode }) => {
            this.container.append("line")
                .attr("class", "line")
                .attr("x1", nodePositions[fromNode].x)
                .attr("y1", nodePositions[fromNode].y)
                .attr("x2", nodePositions[toNode].x)
                .attr("y2", nodePositions[toNode].y);
        });
    }



    
    
    

    creatingAMapForAllCircles(container) {
        var mapWithCircles = new Map();

        container.selectAll("circle").data(this.data).nodes().forEach(function(circleNode) {
            var circle = d3.select(circleNode);
            var dataGroup = circle.attr("data-group");

            if (!mapWithCircles.has(dataGroup)) {
                mapWithCircles.set(dataGroup, []);
            }

            mapWithCircles.get(dataGroup).push(circle);
        });

        return mapWithCircles;
    }

    creatingAListWithAvailableGroups(container) {
        var listWithGroups = [];

        container.selectAll("circle").data(this.data).nodes().forEach(function(circleNode) {
            var circle = d3.select(circleNode);
            if (!listWithGroups.includes(circle.attr("data-group"))) {
                listWithGroups.push(circle.attr("data-group"));
            }
        });

        return listWithGroups;
    }

    creatingANodePositionObject(container, color) {
        var nodePositionObject = {};

        
        var colorGroup = this.returnNewDataInstance()
        var colorGroupMapping = colorGroup.getGroupToColorMap()

        container.selectAll("circle").data(this.data).nodes().forEach(function(circleNode) {
            var circle = d3.select(circleNode);
            var id = circle.attr("id");
            var group = circle.attr("data-group");
            var colorFromGroup = colorGroupMapping[group]
            if (colorFromGroup === color) {
                nodePositionObject[id] = { x: +circle.attr("cx"), y: +circle.attr("cy") };
            }
        });

        // Output the resulting nodePositionObject for verification
        //console.log("nodePositionObject:", nodePositionObject);

        return nodePositionObject;
    }

    transformMapToListWithoutSelectedGroup(keyToRemove, mapWithCircles) {
        var restCirclesList = [];
        var newMapDatteBayo = new Map(mapWithCircles);
        newMapDatteBayo.delete(keyToRemove);

        newMapDatteBayo.forEach(function(value) {
            restCirclesList = restCirclesList.concat(value);
        });

        return restCirclesList;
    }
}

class Graph {
    constructor(kelpContainer, definedGroup, data, dataString) {
        this.kelpContainer = kelpContainer;
        this.definedGroup = definedGroup;

        this.newDataInstance = accumulator.getSpecificDataSet(dataString)
        this.newDataInstance.getGroupToColorMap()

        //console.log(this.newDataInstance.getGroupToColorMap())


        this.nodes = [];
        this.edges = [];
        this.data = data;
        
    }

    returnNewDataInstance(){
        return this.newDataInstance
    }

    createNodes() {
        var colorFromGroupGeneral = this.newDataInstance.getGroupToColorMap()
        //console.log("ColorFromGroupGeneral ", colorFromGroupGeneral)
        var mapWithNodes = new Map();
        this.kelpContainer.selectAll("circle").data(this.data).nodes().forEach(function(circleNode) {
            var circle = d3.select(circleNode);
            var group = circle.attr("data-group");
            //console.log("Group from createNodes is ", group)
            var colorFromGroup = colorFromGroupGeneral[group]
            //console.log(colorFromGroup)

            var id = circle.attr("id");
            if (!mapWithNodes.has(colorFromGroup)) {
                // If the key doesn't exist in the map, create a new array
                mapWithNodes.set(colorFromGroup, []);
            }

            // Push the ID to the array corresponding to the group
            mapWithNodes.get(colorFromGroup).push(id);
        });

        
        //Testing mapWithNodes
        //console.log("MapWithNodes from CreateNodes Graph is ", mapWithNodes)
        //Testing mapWithNodes

        //Testing definedGroup
        //console.log("DefinedGroup ", this.definedGroup)
        //Testing definedGroup


        this.nodes = mapWithNodes.get(this.definedGroup);
        
    }

    creatingAllNodes() {
        var mapWithNodes = new Map();
        var self = this; // Preserve the context

        this.kelpContainer.selectAll("circle").data(this.data).nodes().forEach(function(circleNode) {
            var circle = d3.select(circleNode);
            var group = circle.attr("data-group");
            var id = circle.attr("id");

            // Debugging logs
            //console.log("Processing circle with group:", group, "and id:", id);

            if (!mapWithNodes.has(group)) {
                // If the key doesn't exist in the map, create a new array
                mapWithNodes.set(group, []);
            }

            // Push the ID to the array corresponding to the group
            mapWithNodes.get(group).push(id);
        });

        var allNodesList = [];
        const listWithGroups = Array.from(new Set(this.data.map(item => item.group)));

        //var colorWithGroups = listWithGroups.filter(element => returnColorfromGroupMap(this.colorGroup, element));

        // Debugging logs
        //console.log("colorWithGroups ", colorWithGroups);
        //console.log("ListWithGroups:", listWithGroups);
        //console.log("MapwithNodes:", mapWithNodes);

        listWithGroups.forEach((group) => {
            //console.log("Processing group:", group);

            // Check if the group exists in the map
            if (mapWithNodes.has(group)) {
                // Retrieve the array of individual elements for the group
                const elements = mapWithNodes.get(group);

                // Debugging logs
                //console.log("Elements for group", group, ":", elements);

                // Add each element in the array to allNodesList
                elements.forEach((individualElement) => {
                    allNodesList.push(individualElement);
                });
            } else {
                console.error("No entries found for group:", group);
            }
        });

        //console.log("All Nodes List:", allNodesList);
        return allNodesList;
    }

    createEdges() {
        var selectCircleById = (yourCircleId) => {
            // Assuming this.kelpContainer is your D3 selection of the container
            return this.kelpContainer.select("[id='" + yourCircleId + "']");
        };

        for (var i = 0; i < this.nodes.length; i++) {
            for (var j = 0; j < this.nodes.length; j++) {
                if (this.nodes[i] !== this.nodes[j]) {
                    var nodeI = selectCircleById(this.nodes[i]);
                    var nodeJ = selectCircleById(this.nodes[j]);
                    this.edges.push({
                        fromNode: this.nodes[i],
                        toNode: this.nodes[j],
                        distance: calculateDistance(nodeI.attr("cx"), nodeI.attr("cy"), nodeJ.attr("cx"), nodeJ.attr("cy"))
                    });
                }
            }
        }
    }

    getNodes() {
        return this.nodes;
    }

    getEdges() {
        return this.edges;
    }

    antiCollisionAlgorithmInitializator() {
        var selectCircleById = (yourCircleId) => {
            // Assuming this.kelpContainer is your D3 selection of the container
            return this.kelpContainer.select("[id='" + yourCircleId + "']");
        };

        var allCircles = [];

        var allCirclesId = this.creatingAllNodes();

        allCirclesId.forEach((idElement) => {
            allCircles.push(selectCircleById(idElement));
        });

        this.edges.forEach((edgeElement) => {
            edgeElement.potentialExtraPaths = [];
        });

        for (var i = 0; i < this.edges.length; i++) {
            var currentCircle = selectCircleById(this.edges[i].fromNode);
            var defaultGroup = currentCircle.attr("data-group");
            var nextCircle = selectCircleById(this.edges[i].toNode);
            this.helperFunctionCollisionOnEdges(defaultGroup, currentCircle, nextCircle, allCircles, this.kelpContainer, i);
        }
    }

    helperFunctionCollisionOnEdges(defaultGroup, currentCircle, nextCircle, allCircles, container, edgeIterator) { //container as helper function only
        var currentCircleX = currentCircle.attr("cx");
        var currentCircleY = currentCircle.attr("cy");

        var nextCircleX = nextCircle.attr("cx");
        var nextCircleY = nextCircle.attr("cy");

        var currentCircleList = [currentCircleX, currentCircleY, currentCircle];
        var nextCircleList = [nextCircleX, nextCircleY, nextCircle];

        var listWithThePaths = this.advancedRecursiveCurrentCircleUpdater(defaultGroup, currentCircleList, nextCircleList, allCircles, [], container, false);

        listWithThePaths.unshift(currentCircleList);

        this.edges[edgeIterator].potentialExtraPaths = this.edges[edgeIterator].potentialExtraPaths.concat(listWithThePaths);

        this.edges[edgeIterator].potentialExtraPaths = this.edges[edgeIterator].potentialExtraPaths.filter(item => item[2].attr("country") !== currentCircle.attr("country"));
        this.edges[edgeIterator].potentialExtraPaths = this.edges[edgeIterator].potentialExtraPaths.filter(item => item[2].attr("country") !== nextCircle.attr("country"));
    }

    advancedRecursiveCurrentCircleUpdater(defaultGroup, currentCircle, nextCircle, allCircles, accumulatorList, container, warningTrigger) {
        const MAX_RECURSION_DEPTH = 1000; // Set a max depth to avoid infinite recursion
        let depth = 0;
    
        const recursiveUpdate = (defaultGroup, currentCircle, nextCircle, allCircles, accumulatorList, container, warningTrigger) => {
            depth++;
    
            // Base case to stop recursion
            if (depth > MAX_RECURSION_DEPTH || (currentCircle[0] === nextCircle[0] && currentCircle[1] === nextCircle[1] && currentCircle[2] === nextCircle[2])) {
                return accumulatorList;
            }
    
            var [closestNextCircle, warningOfCollision] = this.lineToCircleCollision(defaultGroup, currentCircle, nextCircle, allCircles, container, []);
    
            if (warningOfCollision.length != 0 || warningTrigger == true) {
                let list_with_circumference_points = [];
    
                if (warningTrigger == true) {
                    var closestCircleX = currentCircle[0];
                    var closestCircleY = currentCircle[1];
                    var closestCircle = currentCircle[2];
    
                    var closestNextCircleX = closestNextCircle[0];
                    var closestNextCircleY = closestNextCircle[1];
    
                    var slopeCoefficient = calculateSlopeCoefficient(closestNextCircleY, closestCircleY, closestNextCircleX, closestCircleX);
                    var yIntersection = calculateIntersectionWithYaxis(closestNextCircleY, slopeCoefficient, closestNextCircleX);
                    var theTwoPointsBetweenCircleAndLine = findCircleLineIntersection(closestCircle.attr("cx"), closestCircle.attr("cy"), closestCircle.attr("r"), slopeCoefficient, yIntersection);
    
                    var theTwoPointsBetweenCircleAndLineFirstPoint = theTwoPointsBetweenCircleAndLine[0];
                    var theTwoPointsBetweenCircleAndLineSecondPoint = theTwoPointsBetweenCircleAndLine[1];
    
                    list_with_circumference_points = circumferencePathIntersection(theTwoPointsBetweenCircleAndLineFirstPoint, theTwoPointsBetweenCircleAndLineSecondPoint, closestCircle);
    
                    list_with_circumference_points.forEach(point => {
                        point.distanceFromCurrent = calculateDistance(currentCircle[0], currentCircle[1], point[0], point[1]);
                    });
    
                    list_with_circumference_points.forEach((element) => {
                        element.push(closestCircle);
                    });
                } else if (warningOfCollision.length != 0) {
                    var absolutClosestCircle = warningOfCollision[warningOfCollision.length - 1];
    
                    var closestCircleX = absolutClosestCircle[0];
                    var closestCircleY = absolutClosestCircle[1];
                    var closestCircle = absolutClosestCircle[2];
    
                    var slopeCoefficient = calculateSlopeCoefficient(closestCircleY, currentCircle[1], closestCircleX, currentCircle[0]);
                    var yIntersection = calculateIntersectionWithYaxis(closestCircleY, slopeCoefficient, closestCircleX);
                    var theTwoPointsBetweenCircleAndLine = findCircleLineIntersection(closestCircle.attr("cx"), closestCircle.attr("cy"), closestCircle.attr("r"), slopeCoefficient, yIntersection);
    
                    var theTwoPointsBetweenCircleAndLineFirstPoint = theTwoPointsBetweenCircleAndLine[0];
                    var theTwoPointsBetweenCircleAndLineSecondPoint = theTwoPointsBetweenCircleAndLine[1];
    
                    list_with_circumference_points = circumferencePathIntersection(theTwoPointsBetweenCircleAndLineFirstPoint, theTwoPointsBetweenCircleAndLineSecondPoint, closestCircle);
    
                    list_with_circumference_points.forEach(point => {
                        point.distanceFromCurrent = calculateDistance(currentCircle[0], currentCircle[1], point[0], point[1]);
                    });
    
                    list_with_circumference_points.sort((a, b) => a.distanceFromCurrent - b.distanceFromCurrent);
    
                    list_with_circumference_points.forEach((element) => {
                        element.push(closestCircle);
                    });
                }
    
                if (warningOfCollision.length != 0 || warningTrigger == true) {
                    if (warningOfCollision.length != 0) {
                        warningTrigger = true;
                        accumulatorList = accumulatorList.concat(list_with_circumference_points);
                    } else if (warningTrigger == true) {
                        warningTrigger = false;
                        accumulatorList = accumulatorList.concat(list_with_circumference_points);
                        accumulatorList.push(closestNextCircle);
                    }
                } else {
                    accumulatorList.push(closestNextCircle);
                }
            } else {
                accumulatorList.push(closestNextCircle);
            }
    
            if (closestNextCircle[0] == nextCircle[0] && closestNextCircle[1] == nextCircle[1] && closestNextCircle[2] == nextCircle[2]) {
                return accumulatorList;
            } else {
                return recursiveUpdate(defaultGroup, closestNextCircle, nextCircle, allCircles, accumulatorList, container, warningTrigger);
            }
        };
    
        return recursiveUpdate(defaultGroup, currentCircle, nextCircle, allCircles, accumulatorList, container, warningTrigger);
    }
    

    lineToCircleCollision(defaultGroup, currentCircle, nextCircle, allCircles, container, collisionWarnings) {
        const MAX_RECURSION_DEPTH = 1000; // Set a max depth to avoid infinite recursion
        let depth = 0;
    
        const recursiveCollisionCheck = (currentCircle, nextCircle, collisionWarnings) => {
            depth++;
    
            if (depth > MAX_RECURSION_DEPTH) {
                console.warn('Max recursion depth reached');
                return [[nextCircle[0], nextCircle[1], nextCircle[2]], collisionWarnings];
            }
    
            var currentCircleX = currentCircle[0];
            var currentCircleY = currentCircle[1];
            var theCurrentCircle = currentCircle[2];
    
            var nextCircleX = nextCircle[0];
            var nextCircleY = nextCircle[1];
            var theNextCircle = nextCircle[2];
    
            var slopeOriginal = calculateSlopeCoefficient(nextCircleY, currentCircleY, nextCircleX, currentCircleX);
            var b = calculateIntersectionWithYaxis(nextCircleY, slopeOriginal, nextCircleX);
            var unitVectorCurrentNext = unitVector(currentCircleX, currentCircleY, nextCircleX, nextCircleY);
            var calculateDistanceBetweenCurrentAndNext = calculateDistance(currentCircleX, currentCircleY, nextCircleX, nextCircleY);
    
            var listWithPotentialColliders = [];
    
            allCircles.forEach((element) => {
                var elementX = element.attr("cx");
                var elementY = element.attr("cy");
                var elementRadius = element.attr("r");
                if (currentCircleX != elementX && currentCircleY != elementY &&
                    nextCircleX != elementX && nextCircleY != elementY &&
                    theCurrentCircle.attr("cx") != elementX && theCurrentCircle.attr("cy") != elementY &&
                    theNextCircle.attr("cx") != elementX && theNextCircle.attr("cx") != elementY &&
                    defaultGroup != element.attr("data-group")) { //Extra checking 
    
                    var perpendicularListWithAandB = findingSlopeAndYIntersectionOfPerpendicularFunction(elementX, elementY, slopeOriginal);
                    var perpendicularSlope = perpendicularListWithAandB[0];
                    var perpendicularYInterception = perpendicularListWithAandB[1];
                    var xIntersection = findingXintersection(b, perpendicularYInterception, slopeOriginal, perpendicularSlope);
                    var yIntersection = findingYintersection(xIntersection, slopeOriginal, b);
    
                    var minDistanceBetweenInterAndCirc = Infinity;
                    var listWithPerpendicularAndCircleIntersection = findCircleLineIntersection(elementX, elementY, elementRadius, perpendicularSlope, perpendicularYInterception);
    
                    var actualCircPointX = 0;
                    var actualCircPointY = 0;
                    var actualElement = null;
    
                    listWithPerpendicularAndCircleIntersection.forEach(point => {
                        var pointX = point.x;
                        var pointY = point.y;
    
                        var distance = calculateDistance(pointX, pointY, xIntersection, yIntersection);
    
                        if (distance < minDistanceBetweenInterAndCirc) {
                            minDistanceBetweenInterAndCirc = distance;
                            actualCircPointX = pointX;
                            actualCircPointY = pointY;
                            actualElement = element;
                        }
                    });
    
                    var distanceCentrumCirc = calculateDistance(actualCircPointX, actualCircPointY, elementX, elementY);
                    var distanceCentrumInter = calculateDistance(xIntersection, yIntersection, elementX, elementY);
    
                    var calculateDistBetweenCurrentAndElement = calculateDistance(currentCircleX, currentCircleY, elementX, elementY);
    
                    if (distanceCentrumCirc > distanceCentrumInter && calculateDistanceBetweenCurrentAndNext > calculateDistBetweenCurrentAndElement) {
                        listWithPotentialColliders.push([actualCircPointX, actualCircPointY, actualElement]);
                    }
                }
            });
    
            if (listWithPotentialColliders.length != 0) {
                listWithPotentialColliders.forEach((element) => {
                    if (currentCircle[0] != element[0] && currentCircle[1] != element[1] && nextCircle[2] != element[2]) {
                        var elementX = element[0];
                        var elementY = element[1];
                        var unitVectorCurrentElement = unitVector(currentCircleX, currentCircleY, elementX, elementY);
                        var degreeCalculator = degreeBetweenTwoVectors(unitVectorCurrentNext[0], unitVectorCurrentNext[1], unitVectorCurrentElement[0], unitVectorCurrentElement[1]);
                        if (degreeCalculator < 90) {
                            element[2].attr("lineCollision", "true");
                        } else if (degreeCalculator >= 90) {
                            element[2].attr("lineCollision", "false");
                        }
                    }
                });
            }
    
            var collisionInListWithPotentialColliders = listWithPotentialColliders.some(element => element[2].attr("lineCollision") == "true");
    
            if (listWithPotentialColliders.length != 0 && collisionInListWithPotentialColliders) {
                var closestDistanceBetweenCurrentAndElement = Infinity;
                var closestCircleX = 0;
                var closestCircleY = 0;
                var closestCircle = null;
    
                listWithPotentialColliders.forEach((element) => {
                    if (element[2].attr("lineCollision") == "true") {
                        var elementX = element[0];
                        var elementY = element[1];
                        var theElement = element[2];
    
                        var distanceBetweenCurrentAndElement = calculateDistance(currentCircleX, currentCircleY, elementX, elementY);
    
                        if (distanceBetweenCurrentAndElement < closestDistanceBetweenCurrentAndElement) {
                            closestDistanceBetweenCurrentAndElement = distanceBetweenCurrentAndElement;
                            closestCircleX = elementX;
                            closestCircleY = elementY;
                            closestCircle = theElement;
                        }
                    }
                });
    
                collisionWarnings.push([closestCircleX, closestCircleY, closestCircle]);
    
                return recursiveCollisionCheck([currentCircleX, currentCircleY, theCurrentCircle], [closestCircleX, closestCircleY, closestCircle], collisionWarnings);
            } else {
                return [[nextCircleX, nextCircleY, theNextCircle], collisionWarnings];
            }
        };
    
        return recursiveCollisionCheck(currentCircle, nextCircle, collisionWarnings);
    }
    
}

class ShortestPathAlgorithm {
    constructor(kelpContainer, actualGraph) {
        this.kelpContainer = kelpContainer;
        //this.definedGroup = definedGroup
        this.graph = actualGraph;
        this.nodes = this.graph.getNodes();
        this.edges = this.graph.getEdges();
    }

    find(subsets, node) {
        if (subsets[node].parent !== node) {
            subsets[node].parent = this.find(subsets, subsets[node].parent);
        }
        return subsets[node].parent;
    }

    union(subsets, node1, node2) {
        let root1 = this.find(subsets, node1);
        let root2 = this.find(subsets, node2);

        if (subsets[root1].rank < subsets[root2].rank) {
            subsets[root1].parent = root2;
        } else if (subsets[root1].rank > subsets[root2].rank) {
            subsets[root2].parent = root1;
        } else {
            subsets[root1].parent = root2;
            subsets[root2].rank++;
        }
    }

    minimumSpanningTree() { //Given that we have nodes where all are interconnected with each other. Kruskal Algorithm implementation
        // Initialize subsets for union-find
        let subsets = {};
        this.nodes.forEach(node => {
            subsets[node] = { parent: node, rank: 0 };
        });

        // Sort all the edges in non-decreasing order of their distance
        let edges = this.edges.slice().sort((a, b) => a.distance - b.distance);

        let result = []; // This will store the resultant MST
        edges.forEach(edge => {
            let node1 = edge.fromNode;
            let node2 = edge.toNode;

            let root1 = this.find(subsets, node1);
            let root2 = this.find(subsets, node2);

            // If including this edge doesn't cause a cycle
            if (root1 !== root2) {
                result.push(edge); // Add it to the result
                this.union(subsets, root1, root2); // Union the sets
            }
        });

        // The resulting array of edges represents the MST
        return result;
    }
}

function calculateDistance(circle1CX, circle1CY, circle2CX, circle2CY) {
    var cx1 = parseFloat(circle1CX);
    var cy1 = parseFloat(circle1CY);
    var cx2 = parseFloat(circle2CX);
    var cy2 = parseFloat(circle2CY);
    return Math.sqrt(Math.pow(cx2 - cx1, 2) + Math.pow(cy2 - cy1, 2));
}

function calculateSlopeCoefficient(circle2CY, circle1CY, circle2CX, circle1CX) {
    var y2 = parseFloat(circle2CY);
    var y1 = parseFloat(circle1CY);
    var x2 = parseFloat(circle2CX);
    var x1 = parseFloat(circle1CX);

    return (y2 - y1) / (x2 - x1);
}

function calculateIntersectionWithYaxis(circle2CY, slopeCoefficient, circle2CX) {
    var y2 = parseFloat(circle2CY);
    var a = parseFloat(slopeCoefficient);
    var x2 = parseFloat(circle2CX);

    return y2 - a * x2;
}

function findingXintersection(yIntersectionOriginalLine, yIntersectionPerpendicularLine, slopeOriginal, slopePerpendicular) {
    var b2 = parseFloat(yIntersectionPerpendicularLine);
    var b1 = parseFloat(yIntersectionOriginalLine);
    var a1 = parseFloat(slopeOriginal);
    var a2 = parseFloat(slopePerpendicular);

    return (b2 - b1) / (a1 - a2);
}

function findingYintersection(XIntersection, slopeOriginal, yIntersectionOriginalLine) {
    var x = parseFloat(XIntersection);
    var a1 = parseFloat(slopeOriginal);
    var b1 = parseFloat(yIntersectionOriginalLine);

    return a1 * x + b1;
}

function findingSlopeAndYIntersectionOfPerpendicularFunction(circleX, circleY, slopeOriginal) {
    var a = (-1 / slopeOriginal);
    var b = circleY - a * circleX;
    return [a, b];
}

function findCircleLineIntersection(circleCenterX, circleCenterY, circleRadius, lineSlope, lineIntercept) {
    circleCenterX = parseFloat(circleCenterX);
    circleCenterY = parseFloat(circleCenterY);
    circleRadius = parseFloat(circleRadius);
    lineSlope = parseFloat(lineSlope);
    lineIntercept = parseFloat(lineIntercept);

    let a = 1 + Math.pow(lineSlope, 2);
    let b = 2 * (lineSlope * (lineIntercept - circleCenterY) - circleCenterX);
    let c = Math.pow(circleCenterX, 2) + Math.pow(lineIntercept - circleCenterY, 2) - Math.pow(circleRadius, 2);

    // Step 2: Solve the quadratic equation
    let discriminant = Math.pow(b, 2) - 4 * a * c;
    if (discriminant < 0) {
        // No real roots, no intersection
        return [];
    } else if (discriminant === 0) {
        // One real root, tangent
        let x = -b / (2 * a);
        let y = lineSlope * x + lineIntercept;
        return [{ x, y }];
    } else {
        // Two real roots, intersection
        let x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        let y1 = lineSlope * x1 + lineIntercept;
        let x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        let y2 = lineSlope * x2 + lineIntercept;
        return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
    }
}

function calculateVector(circle1CX, circle1CY, circle2CX, circle2CY) {
    var vectorX = circle2CX - circle1CX;
    var vectorY = circle2CY - circle1CY;
    return [vectorX, vectorY];
}

function unitVector(circle1CX, circle1CY, circle2CX, circle2CY) {
    var listVector = calculateVector(circle1CX, circle1CY, circle2CX, circle2CY);
    var vectorX = listVector[0];
    var vectorY = listVector[1];

    var unitVectorX = vectorX / distanceVectorCalculation(vectorX, vectorY);
    var unitVectorY = vectorY / distanceVectorCalculation(vectorX, vectorY);

    return [unitVectorX, unitVectorY];
}

function distanceVectorCalculation(vectorX, vectorY) {
    return Math.sqrt(Math.pow(vectorX, 2) + Math.pow(vectorY, 2));
}

function degreeBetweenTwoVectors(vector1X, vector1Y, vector2X, vector2Y) {
    cosinusDegree = ((vector1X * vector2X) + (vector1Y * vector2Y)) / (distanceVectorCalculation(vector1X, vector1Y) * distanceVectorCalculation(vector2X, vector2Y));

    //convert radians to degrees

    let angleInRadians = Math.acos(cosinusDegree);
    let angleInDegrees = angleInRadians * (180 / Math.PI);

    return angleInDegrees;
}

// Helper function to check if point C is on the right side of the line formed by points A and B
function isNotRightTurn(a, b, c) {
    // This uses the cross product; if positive, then it's a right turn
    return ((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])) <= 0;
}

function getCentroid(pts) {
    let first = pts[0], last = pts[pts.length - 1];
    if (first[0] !== last[0] || first[1] !== last[1]) pts.push(first);
    let twicearea = 0, x = 0, y = 0, nPts = pts.length;
    let p1, p2, f;
    for (let i = 0, j = nPts - 1; i < nPts; j = i++) {
        p1 = pts[i]; p2 = pts[j];
        f = p1[0] * p2[1] - p2[0] * p1[1];
        twicearea += f;
        x += (p1[0] + p2[0]) * f;
        y += (p1[1] + p2[1]) * f;
    }
    f = twicearea * 3;
    return [x / f, y / f];
}

function offsetPoints(hull, centroid, offset) {
    return hull.map(point => {
        const [px, py] = point;
        const [cx, cy] = centroid;
        const vector = [px - cx, py - cy];
        const length = Math.sqrt(vector[0] ** 2 + vector[1] ** 2);
        const unitVector = [vector[0] / length, vector[1] / length];
        return [px + unitVector[0] * offset, py + unitVector[1] * offset];
    });
}

function dfs(points, visited, startIdx, connections) {
    let stack = [startIdx];
    const component = [];
    while (stack.length > 0) {
        const idx = stack.pop();
        if (!visited[idx]) {
            visited[idx] = true;
            component.push(points[idx]);
            stack.push(...connections[idx]);
        }
    }
    return component;
}

function isPointInSpecificHull(x, y, specificHull) {
    // Create a Turf.js point using the coordinates x and y
    const point = turf.point([x, y]);

    // Check if this point is inside the specific hull's polygon
    // specificHull.hull should be a valid Turf.js Polygon object
    return turf.booleanPointInPolygon(point, specificHull.hull);
}

function choosingSpecificHull(hulls, color) {
    const foundHull = hulls.filter(hull => hull.color === color);
    return foundHull;
}

// Function to interpolate points along a line segment
function interpolatePoints(p1, p2, numPoints) {
    const points = [];
    const dx = (p2.x - p1.x) / numPoints;
    const dy = (p2.y - p1.y) / numPoints;
    for (let i = 0; i <= numPoints; i++) {
        points.push({ x: p1.x + i * dx, y: p1.y + i * dy });
    }
    return points;
}

// Function to calculate normal vector
function calculateNormalVector(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    return { nx: -dy / length, ny: dx / length };
}




function circumferencePathIntersection(pointAOnCircle, pointBOnCircle, circle) {
    // Check if points and circle are defined
    if (!pointAOnCircle || !pointBOnCircle || !circle) {
        console.error("One or more arguments are undefined", { pointAOnCircle, pointBOnCircle, circle });
        return [];
    }

    var pointAOnCircleX = pointAOnCircle.x;
    var pointAOnCircleY = pointAOnCircle.y;
    var pointBOnCircleX = pointBOnCircle.x;
    var pointBOnCircleY = pointBOnCircle.y;

    // Check if points are valid numbers
    if (isNaN(pointAOnCircleX) || isNaN(pointAOnCircleY) || isNaN(pointBOnCircleX) || isNaN(pointBOnCircleY)) {
        console.error("Invalid points", { pointAOnCircleX, pointAOnCircleY, pointBOnCircleX, pointBOnCircleY });
        return [];
    }

    var circleX = Number(circle.attr("cx"));
    var circleY = Number(circle.attr("cy"));
    var circleR = Number(circle.attr("r"));

    // Check if circle attributes are valid numbers
    if (isNaN(circleX) || isNaN(circleY) || isNaN(circleR)) {
        console.error("Invalid circle attributes", { circleX, circleY, circleR });
        return [];
    }

    var angleForPointA = theta(circleX, circleY, pointAOnCircleX, pointAOnCircleY);
    var angleForPointB = theta(circleX, circleY, pointBOnCircleX, pointBOnCircleY);

    // Check if angles are valid
    if (isNaN(angleForPointA) || isNaN(angleForPointB)) {
        console.error("Invalid angles", { angleForPointA, angleForPointB });
        return [];
    }

    var numPoints = 10;
    return generatePointsBetween(circleR, circleX, circleY, pointAOnCircleX, pointAOnCircleY, pointBOnCircleX, pointBOnCircleY, numPoints);
}


function theta(cx, cy, x, y){
    var angle = Math.atan2(y - cy, x - cx)

    let angleDegrees = angle * (180 / Math.PI);

    // Ensure the angle is within the range [0, 360)
    if (angleDegrees < 0) {
        angleDegrees += 360;
}
    return angleDegrees
}
    
function generatePointsBetween(radius, cx, cy, x1, y1, x2, y2, numPoints) {
    var points = [];
    var angle1 =theta(cx, cy, x1, y1) * (Math.PI / 180) // Angle of point 1
    var angle2 = theta(cx, cy, x2, y2) * (Math.PI / 180) // Angle of point 2

    // Ensure the angles are within the range [0, 2 * Math.PI)
    if (angle1 < 0) angle1 += 2 * Math.PI;
    if (angle2 < 0) angle2 += 2 * Math.PI;

    // Calculate the angle step between points
    var angleStep = (angle2 - angle1) / (numPoints);

    // Generate intermediary points
    for (var i = 1; i <= numPoints; i++) {
        var angle = angle1 + i * angleStep;
        var x = cx + Math.cos(angle) * radius; // Assuming you have the radius of the circle
        var y = cy + Math.sin(angle) * radius; // Assuming you have the radius of the circle
        points.push([x,y]);
    }

    return points;
}
