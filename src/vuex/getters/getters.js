import {isFinite} from 'lodash';
import {formatShort, getElement} from "../../util/common";

export default {
    activeMode: state => state.panels[state.activeFilm.f.config.activeModeIdx],
    activeMask: state => isFinite(state.activeFilm.f.config.activeMaskIdx) && state.activeFilm.f.masks[state.activeFilm.f.config.activeMaskIdx],
    activeMaskId: (state, getters) => getters.activeMask && getters.activeMask.e._id,
    visibleMasks: (state, getters) => getters.activeMask ? [getters.activeMask] : [],
    modeIs: (state, getters) => mode => getters.activeMode.name === mode,
    selectedId: state => state.activeFilm.f.selection.elementId,
    selection: (state, getters) => getElement(state.activeFilm, getters.selectedId),
    noSelection: (state, getters) => !getters.selection,
    base: (state) => state.activeFilm.f.config.imageDuration * (1/state.activeFilm.f.config.durationCoef),
    currentSec: (state, getters) => formatShort(state.activeFilm.f.ftz * getters.base / 1000),
    totalSec: (state, getters) => formatShort(state.activeFilm.f.imageCount * getters.base / 1000)
}