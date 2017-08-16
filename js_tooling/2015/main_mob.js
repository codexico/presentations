import * as contact from './modules/contact';
import * as sideMenu from './modules/side-menu';
import * as more from './modules/more';
import * as registration from './modules/registration';
import * as validation from './modules/validation';
import * as flashes from './modules/flash-message';
import * as hacks from './helpers/hacks';

hacks.init();

/*init sidebar if exist*/
if (document.querySelector('#c-menu--slide-left')) {
    sideMenu.init();
}

contact.init();
more.init();
registration.init();
validation.init();
flashes.init();
