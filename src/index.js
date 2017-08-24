import angular from 'angular';

import 'angular-ui-router';
import routesConfig from './routes';

import main from './app/main';

import messages from './app/messages';
import joiners from './app/joiners';
import typing from './app/typing';
import sendMessage from './app/send-message';
import avatar from './app/avatar';

import users from './app/users';
import user from './app/user';

import socket from './socket.factory';

import './index.scss';

angular
.module('app', ['ui.router'])
.factory('socket', ['$rootScope', socket])
.config(routesConfig)
.component('app', main)
.component('users', users)
.component('user', user)
.component('messages', messages)
.component('joiners', joiners)
.component('typing', typing)
.component('sendMessage', sendMessage)
.component('avatar', avatar);
