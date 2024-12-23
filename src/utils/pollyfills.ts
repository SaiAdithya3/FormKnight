if (!Array.prototype.includes) {
    Array.prototype.includes = function (element: any) {
        return this.indexOf(element) !== -1;
    };
}