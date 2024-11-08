import Quill from 'quill';

const BaseModule = Quill.import('core/module');

class CustomToolbarModule extends BaseModule {
  constructor(quill, options) {
    super(quill, options);
    // Custom initialization code
    console.log('CustomToolbarModule initialized with options:', options);
  }

  // Custom methods
  handleBold() {
    console.log('Bold button clicked');
  }
}

Quill.register('modules/customToolbar', CustomToolbarModule);
export default CustomToolbarModule;