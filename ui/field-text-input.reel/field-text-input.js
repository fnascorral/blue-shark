var Component = require("montage/ui/component").Component;

exports.FieldTextInput = Component.specialize({
    hasTemplate: {
        value: true
    },

    disabled: {
        value: false
    },

    hasError: {
        value: false
    },

    prepareForActivationEvents: {
        value: function () {
            if (this.validator) {
                this.control.element.addEventListener('blur', this, true);
            }
        }
    },

    captureBlur: {
        value: function(event) {
            this.hasError = !this.validator.validate(this.value);
        }
    }
});
