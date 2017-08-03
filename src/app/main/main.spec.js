import angular from 'angular';
import 'angular-mocks';
import {main} from './main';

describe('main component', () => {
  beforeEach(() => {
    angular
      .module('app', ['app/main/main.html'])
      .component('app', main);
    angular.mock.module('app');
  });

  it('should render the main elements', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<app>Loading...</app>')($rootScope);
    $rootScope.$digest();
    expect(element.find('header').length).toEqual(1);
    expect(element.find('user').length).toEqual(1);
    expect(element.find('users').length).toEqual(1);
    expect(element.find('messages').length).toEqual(1);
    expect(element.find('send-message').length).toEqual(1);
    expect(element.find('footer').length).toEqual(1);
  }));
});
