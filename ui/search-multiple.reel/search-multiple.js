/**
 * @module ui/search-multiple.reel
 */
var Search = require("../search.reel").Search,
    _ = require("lodash");

/**
 * @class SearchMultiple
 * @extends Component
 */
exports.SearchMultiple = Search.specialize(/** @lends SearchMultiple# */ {

    enterDocument: {
        value: function (firstTime) {
            if (firstTime) {
                this.addRangeAtPathChangeListener("_multipleSelectComponent.values", this, "handleDisplayedValuesChange");
            }
        }
    },

    handleDisplayedValuesChange: {
        value: function (addedItems, removedItems) {
            if (removedItems && removedItems.length && addedItems && !addedItems.length) {
                var self = this;

                removedItems.forEach(function (removedItem) {
                    var index = _.findIndex(self.values, function (value) {
                        return value.id === removedItem.id;
                    });

                    if (index > -1) {
                        self.values.splice(index, 1);
                    }
                });
            }
        }
    },

    controller: {
        value: null
    },

    handleAction: {
        value: function (event) {
            var target = event.target;

            if (target === this._searchButton || target === this._searchInput) {
                this._search(this._searchInput.value);
            } else if (target === this._addButton) {
                this.switchValue = 'write';
                this._selectComponent.selectedValues = null;
                this._results = this.initialOptions;
                this._searchInput.focus();

            } else if (target === this._cancelButton || target === this._validButton) {
                if (target === this._validButton) {
                    var self = this;

                    this.values = _.uniqWith(
                        _.concat(this.values || [],
                            _.difference(this._results,
                                _.differenceWith(this._results, this._selectComponent.selectedValues, function (object, value) {
                                    return object[self.valuePath] === value;
                                })
                            )
                        )
                        , function (a, b) {
                            return a.id === b.id;
                        });
                }

                this._resetState();
            }
        }
    }

});
