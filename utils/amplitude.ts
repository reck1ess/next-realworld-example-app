
// Purpose: Amplitude analytics helper functions.
const trackPageView = (page: string): void => {    
    // Replace this with your actual analytics logging code
    console.log(`trackPageView page: ${page}`);
}

const trackButtonClick = (button: string): void => {
    // Replace this with your actual analytics logging code
    console.log(`trackButtonClick "${button}" clicked`);
  };

  // Function to log user sign-up event
const trackFormSubmission = (form: string, formData: any): void => {
    // Replace this with your actual analytics logging code
    console.log( `trackFormSubmission form: ${form} formData: ${formData}`);

};

  
export { trackPageView, trackButtonClick, trackFormSubmission };