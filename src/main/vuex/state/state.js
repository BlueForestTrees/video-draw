import {cloneOffset} from "../../const/values";
import {anagram} from "../../util/common";
import On from "../../const/on";
import modes from "../../const/modes";

export const createNav = () => ({
    menuVisible: true
});
export const createFilms = () => ([]);
export const createName = anagram;
export const createSelection = () => ({
    element: null,
    box: null
});
export const createPens = () => ([
    Object.assign(createPen("basic"), {}),
    Object.assign(createPen("little red"), {color: 'red', width: 5}),
    Object.assign(createPen("mini blue"), {color: 'blue', width: 2}),
    Object.assign(createPen("black stroke"), {width: 7}),
]);
export const createPen = name => ({
    name,
    color: '#000000',
    width: 10,
    opacity: 1,
    mask: false,
    stroke: true
});
export const createFilm = () => ({
    name: createName(),
    elements: [],
    masks: [],
    children: [],
    imageCount: 0,
    ftz: 0,
    keptImage: 0,
    player: createPlayer(),
    config: createConfig(),
    selection: createSelection()
});
export const createFilmInstance = (f, tz) => ({
    f: f || createFilm(),
    _id: createId(),
    tx: 0,
    ty: 0,
    tz: tz || 0
});
export const createPlayer = () => ({
    playing: false,
    startMoment: null
});
export const createConfig = () => ({
    showPhantom: true,
    imageDuration: 15,
    durationCoef: 1,
    activeModeIdx: 0,


    smooth: true,
    smoothing: 0.2,
    flattening: 0,

    simplify: false,
    simpleMode: "visvalingam",
    simpleCoef: 10
});
export const createId = () => Math.random() + "";


export const createElement = ({_id, pen, points, svg, d, anim, mask}) => ({
    _id: _id || createId(),
    pen: Object.assign({}, pen),
    points,
    svg,
    d,
    anim,
    mask
});

export const createElementInstance = (e, film) => ({
    e,
    _id: createId(),
    tx: 0,
    ty: 0,
    tz: film.f.ftz
});

export const cloneElementInstance = ei => ({
    e: ei.e,
    _id: createId(),
    tz: ei.tz,
    tx: ei.tx + cloneOffset,
    ty: ei.ty + cloneOffset
});
export const createModes = () => ([
    {name: modes.BRUSH, icon: "brush", canColor: true, surfaceAction: On.START_DRAW},
    {name: modes.SELECT, icon: "pan_tool", surfaceAction: On.START_SELECT},
    {name: modes.ZOOM, icon: "search", surfaceAction: On.START_ZOOM},
    {name: modes.FILM, icon: "map"}
]);
export const createImportDialog = () => ({
    visible: false
});

export default {
    nav: createNav(),
    films: createFilms(),
    activeFilm: null,
    pens: createPens(),
    activePen: null,
    modes: createModes(),
    importDialog: createImportDialog()
};