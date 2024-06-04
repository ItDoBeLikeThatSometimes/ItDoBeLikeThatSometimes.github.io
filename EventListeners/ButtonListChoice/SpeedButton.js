class SpeedButton {

  constructor(){
    this.selectedSpeed = null;
  }

  settingSpeed() {
    document.addEventListener('DOMContentLoaded', () => {
      const speedButton = document.getElementById('speedButton');
      const speedOptions = document.getElementById('speedOptions');
      const speedOptionElements = document.querySelectorAll('.speedOption');

      speedButton.addEventListener('click', () => {
        // Toggle the visibility of the speed options list
        if (speedOptions.style.display === 'none' || speedOptions.style.display === '') {
          speedOptions.style.display = 'block';
        } else {
          speedOptions.style.display = 'none';
        }
      });

      speedOptionElements.forEach(option => {
        option.addEventListener('click', (event) => {
          // Remove 'selected' class from all options
          speedOptionElements.forEach(opt => opt.classList.remove('selected'));

          // Add 'selected' class to the clicked option
          event.target.classList.add('selected');

          // Store the selected speed
          this.selectedSpeed = event.target.textContent;
        });
      });
    });
  }

  getSelectedSpeed() {
    return this.selectedSpeed;
  }
}
