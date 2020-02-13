"use strict";
exports.__esModule = true;
var Form = /** @class */ (function () {
    function Form() {
        this.tags = [];
        //BINDS
        this.HasTag = this.HasTag.bind(this);
        this.HasShape = this.HasShape.bind(this);
        this.StopUpdate = this.StopUpdate.bind(this);
        this.Destroy = this.Destroy.bind(this);
        this.Resize = this.Resize.bind(this);
    }
    Form.prototype.HasShape = function (shape) {
        return this.shape === shape;
    };
    Form.prototype.HasTag = function (tag) {
        return this.tags.includes(tag);
    };
    Form.prototype.StopUpdate = function () {
        //OVERRIDDEN BY CHILD
    };
    Form.prototype.Destroy = function () {
        this.StopUpdate();
        delete this;
    };
    Form.prototype.Resize = function () {
        //OVERRIDDEN BY CHILD
    };
    return Form;
}());
exports["default"] = Form;
