import Do from "../../const/do";
import {createFilm, createFilmInstance} from "../state/state";
import {getBBox, getTxTy, simplifyFilm} from "../../util/geo";
import _ from 'lodash';

export default {
    [Do.SET_SELECTION_ELEMENT]: (state, {film, elementId}) => {
        film.f.selection.elementId = elementId;
    },
    [Do.SET_SELECTION_BOX]: (state, {elementId, film, domRef}) => {
        if (elementId) {
            film.f.selection.box = {
                ...getBBox(domRef.svg, elementId),
                ...getTxTy(domRef.svg, elementId)
            };
        }
    },
    [Do.ACTIVATE_NEW_FILM]: state => {
        const newFilm = createFilmInstance();
        state.films.push(newFilm);
        state.activeFilm = newFilm;
    },
    [Do.ACTIVATE_FIRST_PEN]: state => {
        if (state.pens && state.pens[0]) {
            state.activePen = state.pens[0];
        } else {
            console.error("state.pens vide")
        }
    },
    [Do.CLEAR_FILM]: ({}, film) => {
        Object.assign(film.f, createFilm());
    },
    [Do.CLEAR_FILM]: ({}, film) => {
        Object.assign(film.f, createFilm());
    },
    [Do.DELETE_ELEMENT]: ({}, {ei, film}) => {
        film.f.elements.splice(
            _.findIndex(
                film.f.elements,
                {_id: ei._id}),
            1);
    },
    [Do.APPLY_SIMPLIFICATION]: ({}, film) => {
        simplifyFilm(film);
        film.f.config.simplify = false;
    },
};
