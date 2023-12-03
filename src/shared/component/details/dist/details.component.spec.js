"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var details_component_1 = require("./details.component");
describe('DetailsComponent', function () {
    var component;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [details_component_1.DetailsComponent]
        });
        fixture = testing_1.TestBed.createComponent(details_component_1.DetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
