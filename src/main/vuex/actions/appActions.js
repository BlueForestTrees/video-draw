import Do from "../../const/do";
import On from "../../const/on";
import {deleteFilm, getFilm, getFilms, saveFilm} from "../../rest/api";
import {cloneFilm, createId} from "../state/state";

export default {
    [On.MOUNT_APP]: async ({commit, dispatch}) => {
        commit(Do.ACTIVATE_FIRST_PEN);
        await dispatch(On.LOAD_FILMS);
        await dispatch(On.ACTIVATE_NEW_FILM);
    },
    [On.LOAD_FILMS]: async ({commit}) => {
        try {
            commit(Do.SET_FILMS, await getFilms());
        } catch (e) {
            console.error("impossible de récupérer les films", e);
        }
    },
    [On.LOAD_FILM]: async ({commit}, film) => {
        commit(Do.SELECT_FILM, await getFilm(film._id));
    },
    [On.DELETE_FILM]: async ({commit}, film) => {
        await deleteFilm(film._id);
    },
    [On.SAVE_FILM_AS]: async ({dispatch, commit}, {film, name}) => {
        let filmToSave = film;
        const nameChanged = name && filmToSave.f.name !== name;
        if (nameChanged) {
            filmToSave = cloneFilm(filmToSave, name);
            filmToSave.f.name = name;
            filmToSave._id = createId();
        }
        await saveFilm(filmToSave);
        if (nameChanged) {
            commit(Do.ADD_FILM, filmToSave);
            commit(Do.SELECT_FILM, filmToSave);
        }
    }
}