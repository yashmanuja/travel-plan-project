import { TestBed } from '@angular/core/testing';

import { LoadingScreenService } from './loading-screen.service';
import { componentFactoryName } from '@angular/compiler';
import { Component } from '@angular/core';

describe('LoadingScreenService', () => {
  let loadingScreenService: LoadingScreenService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    loadingScreenService = TestBed.get(LoadingScreenService);
  });

  it('should be created', () => {
    expect(loadingScreenService).toBeTruthy();
  });

  it('should call the start loading setter', () => {
    loadingScreenService.startLoading();
    expect(loadingScreenService.loading).toBe(true);
  }); 
  it('should call the stop loading setter', () => {
    loadingScreenService.stopLoading();
    expect(loadingScreenService.loading).toBe(false);
  }); 
});