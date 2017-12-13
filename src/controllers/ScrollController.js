import { testForPassiveScroll } from '../utils/index';
import Subscribers from './Subscribers';

/**
 * -------------------------------------------------------
 * Scroll Controller
 * -------------------------------------------------------
 *
 * The scroll controller for setting up window
 * scroll event and storing the scroll position
 *
 */

class ScrollController extends Subscribers {
    constructor() {
        super();
        this._addListeners();
    }

    static init() {
        return new ScrollController();
    }

    // Tracks current scroll y distance
    state = {
        scrollY: 0,
    };

    supportsPassive = testForPassiveScroll();

    // Passive support test
    get listenerOptions() {
        return this.supportsPassive ? { passive: true } : false;
    }

    // Window scroll handler. Sets the 'scrollY'
    _handleScroll = () => {
        // Save current scroll
        const scrollY = window.pageYOffset; // Supports IE 9 and up.

        this.setState({
            scrollY,
        });
    };

    _addListeners() {
        window.addEventListener(
            'scroll',
            this._handleScroll,
            this.listenerOptions
        );
    }

    _removeListeners() {
        window.removeEventListener(
            'scroll',
            this._handleScroll,
            this.listenerOptions
        );
    }

    destroy() {
        this._removeListeners();
    }
}

export default ScrollController;
