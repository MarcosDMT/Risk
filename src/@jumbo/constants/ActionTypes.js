export const SHOW_MESSAGE = 'show_message';
export const HIDE_MESSAGE = 'hide_message';
export const FETCH_START = 'fetch_start';
export const FETCH_SUCCESS = 'fetch_success';
export const FETCH_ERROR = 'fetch_error';

export const UPDATE_AUTH_USER = 'update_auth_user';
export const UPDATE_USER_ROLES = 'update_user_roles';
export const UPDATE_LOAD_USER = 'update_load_user';
export const SEND_FORGET_PASSWORD_EMAIL = 'send_forget_password_email';
export const SIGNIN_GOOGLE_USER_SUCCESS = 'signin_google_user_success';
export const SIGNIN_FACEBOOK_USER_SUCCESS = 'signin_facebook_user_success';
export const SIGNIN_TWITTER_USER_SUCCESS = 'signin_twitter_user_success';
export const SIGNIN_GITHUB_USER_SUCCESS = 'signin_github_user_SUCCESS';
export const SIGNIN_USER_SUCCESS = 'signin_user_success';
export const SIGNOUT_USER_SUCCESS = 'signout_user_success';

export const SET_DASHBOARD_DATA = 'set_dashboard_data';

export const SET_TASK_CURRENT_USER = 'set_task_current_user';
export const SET_TASKS_DATA = 'set_tasks_data';
export const SET_TASK_LIST_DATA = 'set_task_list_data';
export const ADD_TASK = 'add_task';
export const DELETE_TASK = 'delete_task';
export const UPDATE_TASK = 'update_task';
export const SET_FILTER_DATA = 'set_filter_data';
export const ADD_TASK_LIST = 'add_task_list';
export const UPDATE_TASK_LIST = 'update_task_list';
export const DELETE_TASK_LIST = 'delete_task_list';
export const SET_TASK_DETAIL = 'set_task_detail';
export const SEND_MESSAGE = 'send_message';
export const TOGGLE_SIDEBAR_COLLAPSED = 'toggle_sidebar_collapsed';
export const GET_TASKS_COUNTS = 'get_tasks_counts';

//mail app
export const GET_LABELS_LIST = 'get_labels_list';
export const GET_CONNECTIONS_LIST = 'get_connections_list';
export const GET_MAILS_LIST = 'get_mails_list';
export const UPDATE_MAIL_FOLDER = 'update_mail_folder';
export const UPDATE_MAIL_LABEL = 'upade_mail_label';
export const UPDATE_FAVORITE_STATUS = 'update_favorite_status';
export const UPDATE_READ_STATUS = 'update_read_status';
export const UPDATE_IMPORTANT_STATUS = 'update_important_status';
export const COMPOSE_MAIL = 'compose_mail';
export const SET_FILTER_TYPE = 'set_filter_type';
export const GET_SELECTED_MAIL = 'GET_SELECTED_MAIL';
export const UPDATE_SELECTED_MAIL = 'update_selected_mail';
export const NULLIFY_SELECTED_MAIL = 'nullify_selected_mail';
export const REPLY_TO_MAIL = 'reply_to_mail';
export const GET_MAIL_COUNTS = 'get_mail_count';
export const ADD_LABEL = 'add_label';
export const ADD_CONNECTION = 'add_connection';
export const REMOVE_CONNECTION = 'remove_connection';

export const SET_CHAT_USERS = 'set_chat_users';
export const SET_CONTACT_USERS = 'set_contact_users';
export const SET_CURRENT_USER = 'set_current_user';
export const SET_CONVERSATION_DATA = 'set_conversation_data';
export const SEND_NEW_CHAT_MESSAGE = 'send_new_chat_message';
export const SEND_NEW_MEDIA_MESSAGE = 'send_new_media_message';

//Contact App
export const GET_CONTACTS_LIST = 'get_contacts_list';
export const SET_CURRENT_CONTACT = 'set_current_contact';
export const CREATE_CONTACT = 'create_contact';
export const UPDATE_STARRED_STATUS = 'update_starred_status';
export const DELETE_CONTACT = 'delete_contact';
export const UPDATE_CONTACT_LABEL = 'update_contact_label';
export const UPDATE_CONTACT = 'update_contact';
export const GET_CONTACT_COUNTS = 'get_contact_counts';
export const UPDATE_LABEL_ITEM = 'update_label_item';
export const DELETE_LABEL_ITEM = 'delete_label_item';

export const GET_USER_DETAIL = 'get_user_detail';
export const GET_FEED_POSTS = 'get_feed_posts';
export const CREATE_POST = 'create_post';
export const UPDATE_POST = 'update_post';

//Organization Module
// -----Subsidiaries ---- //
export const SUBSIDIARIES = {
  GET_ALL: 'FETCH_SUBSIDIARIES',
  GET_ONE: 'FETCH_SUBSIDIARY',
  SET_CURRENT: 'SET_CURRENT_SUBSIDIARY',
  ADD_ONE: 'ADD_SUBSIDIARY',
  ADD_BULK: 'ADD_BULK_SUBSIDIARIES',
  UPDATE_ONE: 'UPDATE_SUBSIDIARY',
  DELETE_ONE: 'DELETE_SUBSIDIARY',
  DELETE_BULK: 'DELETE_SUBSIDIARIES',
};
//-----Departments ----//
export const DEPARTMENTS = {
  GET_ALL: 'FETCH_DEPARTMENTS',
  GET_ONE: 'FETCH_DEPARTMENT',
  GET_BY_SUBSIDIARY: 'FILTER_BY_SUBSIDIARY',
  ADD_ONE: 'ADD_DEPARTMENT',
  ADD_BULK: 'ADD_BULK_DEPARTMENTS',
  UPDATE_ONE: 'UPDATE_DEPARTMENT',
  DELETE_ONE: 'DELETE_DEPARTMENT',
  DELETE_BULK: 'DELETE_DEPARTMENTS',
};
// -----Sections ---- //
export const SECTIONS = {
  GET_ALL: 'FETCH_SECTIONS',
  GET_ONE: 'FETCH_SECTION',
  ADD_ONE: 'ADD_SECTION',
  ADD_BULK: 'ADD_BULK_SECTIONS',
  GET_BY_DEPARTMENT: 'FILTER_BY_DEPARTMENT',
  UPDATE_ONE: 'UPDATE_SECTION',
  DELETE_ONE: 'DELETE_SECTION',
  DELETE_BULK: 'DELETE_SECTIONS',
};
// -----SubSections ---- //
export const SUB_SECTIONS = {
  GET_ALL: 'FETCH_SUB_SECTIONS',
  GET_ONE: 'FETCH_SUB_SECTION',
  ADD_ONE: 'ADD_SUB_SECTION',
  GET_BY_SECTION: 'FILTER_BY_SECTION',
  ADD_BULK: 'ADD_BULK_SUB_SECTIONS',
  UPDATE_ONE: 'UPDATE_SUB_SECTION',
  DELETE_ONE: 'DELETE_SUB_SECTION',
  DELETE_BULK: 'DELETE_SUB_SECTIONS',
};
// ----- Users Module ----- //
export const USERS = {
  GET_ALL: 'FETCH_USERS',
  GET_USERS_LIST: 'USERS_LIST',
  GET_IMPORTED: 'FETCH_IMPORTED_USERS',
  GET_ONE: 'FETCH_USER',
  ADD_ONE: 'ADD_USER',
  UPDATE_STATUS: 'UPDATE_STATUS',
  RESET_PASSWORD: 'RESET_PASSWORD',
  ADD_BULK: 'ADD_BULK_USERS',
  UPDATE_ONE: 'UPDATE_USER',
  DELETE_ONE: 'DELETE_USER',
  DEACTIVATE_ONE: 'DELETE_USER',
  DELETE_BULK: 'DELETE_USERS',
};
// ------ Roles ----------- //
export const ROLES = {
  GET_PERMISSIONS: 'FETCH_PERMISSIONS',
  GET_ROLES: 'FETCH_ROLES',
  GET_ROLES_LIST: 'ROLES_LIST',
  ADD_ONE: 'ADD_ROLE',
  UPDATE_ONE: 'UPDATE_ROLE',
  FILTER_ROLES: 'FILTER_ROLES',
  DELETE_ONE: 'DELETE_ROLE',
};
// ------ Risk Module -------//
export const RISK_PARAMS = {
  RISK_CATEGORIES: {
    GET_ALL: 'FETCH_CATEGORIES',
    GET_ONE: 'FETCH_CATEGORY',
    ADD_ONE: 'ADD_CATEGORY',
    UPDATE_ONE: 'UPDATE_CATEGORY',
    DELETE_ONE: 'DELETE_CATEGORY',
  },
  RISK_CONTROLS: {
    GET_ALL: 'FETCH_CONTROLS',
    GET_ONE: 'FETCH_CONTROL',
    ADD_ONE: 'ADD_CONTROLS',
    UPDATE_ONE: 'UPDATE_CONTROL',
    DELETE_ONE: 'DELETE_CONTROL',
  },
  RISK_PROBABILITY: {
    GET_ALL: 'FETCH_PROBABILITY',
    GET_ONE: 'FETCH_PROBABILITY',
    ADD_ONE: 'ADD_PROBABILITY',
    UPDATE_ONE: 'UPDATE_PROBABILITY',
    DELETE_ONE: 'DELETE_PROBABILITY',
  },
  RISK_SEVERITY: {
    GET_ALL: 'FETCH_SEVERITY',
    GET_ONE: 'FETCH_SEVERITY',
    ADD_ONE: 'ADD_SEVERITY',
    UPDATE_ONE: 'UPDATE_SEVERITY',
    DELETE_ONE: 'DELETE_SEVERITY',
  },
  LOSS_TYPES: {
    GET_ALL: 'FETCH_LOSS_TYPES',
    GET_ONE: 'FETCH_LOSS_TYPES',
    ADD_ONE: 'ADD_LOSS_TYPES',
    UPDATE_ONE: 'UPDATE_LOSS_TYPES',
    DELETE_ONE: 'DELETE_LOSS_TYPES',
  },
  MATRIX: {
    GET_ALL: 'GET_ALL_MATRIX',
    GET_ONE: 'GET_MATRIX',
    UPDATE_MATRIX: 'UPDATE_MATRIX',
  },
};
export const RISK_OWNERS = {
  GET_ALL: 'FETCH_RISK_OWNERS',
  GET_ALL_TYPES: 'FETCH_RISK_OWNERS_TYPES',
  GET_ONE: 'FETCH_RISK_OWNER',
  ADD_ONE: 'ADD_RISK_OWNER',
  UPDATE_ONE: 'UPDATE_RISK_OWNER',
  DELETE_ONE: 'DELETE_RISK_OWNER',
};
export const ROOT_CAUSES = {
  GET_ALL: 'FETCH_ROOT_CAUSES',
  GET_ONE: 'FETCH_ROOT_CAUSES',
  ADD_ONE: 'ADD_ROOT_CAUSES',
  UPDATE_ONE: 'UPDATE_ROOT_CAUSES',
  DELETE_ONE: 'DELETE_ROOT_CAUSES',
};

//--------Compliance Module ------- //
export const COMPLIANCE = {
  LEGAL: {
    GET_ALL: 'FETCH_LEGAL_COMPLIANCE',
    GET_ONE: 'FETCH_LEGAL',
    UPDATE_ONE: 'UPDATE_LEGAL',
    UPDATE_STATUS: 'UPDATE_STATUS',
    ADD_ONE: 'ADD_LEGAL',
    DELETE_ONE: 'DELETE_LEGAL',
    APPROVE_ONE: 'APPROVE_LEGAL',
  },
  ENTERPRISE: {
    GET_ALL: 'FETCH_ENTERPRISE_COMPLIANCE',
    GET_MAIN: 'FETCH_ENTERPRISE_COMPLIANCE_MAIN',
    GET_SUB: 'FETCH_ENTERPRISE_COMPLIANCE_SUB',
    GET_COMPLIANT: 'FETCH_ENTERPRISE_COMPLIANCE_COMPLIANT',
    GET_APPROVAL: 'FETCH_ENTERPRISE_COMPLIANCE_APPROVAL',
    GET_ONE: 'FETCH_ENTERPRISE',
    GET_SELECTED: 'FETCH_ENTERPRISE_SELECTED',
    UPDATE_ONE: 'UPDATE_ENTERPRISE',
    UPDATE_STATUS: 'UPDATE_ENTERPRISE_STATUS',
    ADD_ONE: 'ADD_ENTERPRISE',
    DELETE_ONE: 'DELETE_ENTERPRISE',
  },
  STATUTORY: {
    GET_ALL: 'FETCH_STATUTORY_COMPLIANCE',
    GET_MAIN: 'FETCH_STATUTORY_COMPLIANCE_MAIN',
    GET_SELECTED: 'FETCH_STATUTORY_SELECTED',
    GET_COMPLIANT: 'FETCH_STATUTORY_COMPLIANCE_COMPLIANT',
    GET_APPROVAL: 'FETCH_STATUTORY_COMPLIANCE_COMPLIANT',
    GET_SUB: 'FETCH_STATUTORY_COMPLIANCE_SUB',
    GET_ONE: 'FETCH_STATUTORY',
    UPDATE_ONE: 'UPDATE_STATUTORY',
    UPDATE_STATUS: 'UPDATE_STATUTORY_STATUS',
    ADD_ONE: 'ADD_STATUTORY',
    DELETE_ONE: 'DELETE_STATUTORY',
    APPROVE_ONE: 'APPROVE_COMPLIANCE',
    GET_APPROVALS: 'FETCH_STATUTORY_APPROVALS',
    GET_COMPLIANCES: 'FETCH_COMPLIANCES',
    GET_HISTORY: 'FETCH_HISTORY',
  },
};

// Universe Dashboard
export const UNIVERSEDASHBOARD = {
  GET_UNIVERSE_DATA: 'GET_UNIVERSE_DATA',
  GET_RISK_SUMMARY: 'GET_RISK_SUMMARY',
  GET_COMPLIANCE_SUMMARY: 'GET_COMPLIANCE_SUMMARY',
};

//-------- Utils/Helpers ----------- //
export const UTILS = {
  GET_COUNTRIES: 'GET_COUNTRIES',
  GET_CITIES: 'GET_CITIES',
  GET_RISK_FREQUENCIES: 'GET_RISK_FREQUENCIES',
  GET_COMPLIANCE_FREQUENCIES: 'GET_COMPLIANCE_FREQUENCIES',
  GET_CURRENCIES: 'GET_CURRENCIES',
  GET_CASE_TYPES: 'GET_CASE_TYPES',
  GET_COMPLIANCE_PRIORITIES: 'GET_COMPLIANCE_PRIORITIES',
  GET_APPETITE_TYPES: 'GET_APPETITE_TYPES',
};

export const RISK_UNIVERSE = {
  GET_ALL: 'FETCH_RISKS',
  GET_UPLOADEDDOCNAMES: 'FETCH_UPLOADEDDOCS',
  GET_APPROVALS: 'FETCH_APPROVALS',
  GET_TEMPLATE: 'DOWNLOAD_TEMPLATE',
  GET_UPLOADED_RISKS: 'FETCH_UPLOADED_RISKS',
  UPDATE_UPLOADED_RISKS: 'UPDATE_UPLOADED_RISKS',
  GET_ONE: 'FETCH_RISK',
  UPDATE_ONE: 'UPDATE_RISK',
  UPDATE_STATUS: 'UPDATE_RISK_STATUS',
  ADD_ONE: 'ADD_RISK',
  DELETE_ONE: 'DELETE_RISK',
};

export const RISK_INCIDENT = {
  ADD_ONE: 'ADD_INCIDENT',
  GET_ALL: 'GET_INCIDENT',
  DELETE_ONE: 'DELETE_RISK',
  UPDATE_ONE: 'UPDATE_INCIDENT'
};

export const RISK_INDICATOR = {
  GET_ALL: 'GET_INDICATOR',
  GET_HISTORY: 'GET_HISTORY',
};
