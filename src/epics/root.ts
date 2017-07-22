import 'rxjs';
import * as Rx from 'rxjs';
import { combineEpics, ActionsObservable, Epic } from 'redux-observable'
import { State, ActionObject } from '../types'
import { fetchApplications, fetchEntities, fetchActions, fetchChatSessions } from './fetchEpics'
import { createNewApplication, createNewEntity, createNewAction, createNegativeEntity, createNewChatSession } from './createEpics'
import { deleteAction, deleteApplication, deleteEntity, deleteReverseEntity } from './deleteEpics'
import { editAction, editApplication, editEntity } from './updateEpics'

const rootEpic = combineEpics(
	fetchApplications,
	fetchEntities,
	fetchActions,
	createNewApplication,
	createNewEntity,
	createNewAction,
	createNegativeEntity,
	deleteApplication,
	deleteEntity,
	deleteReverseEntity,
	deleteAction,
	editApplication,
	editAction,
	editEntity,
	fetchChatSessions,
	createNewChatSession
)

export default rootEpic;