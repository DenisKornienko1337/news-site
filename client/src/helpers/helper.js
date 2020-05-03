import Vue from 'vue'

export const helper = {
    notify: (title, text, type) => {
        Vue.notify({
            group: 'notifications',
            title: title,
            text: text,
            type: type
            })
    }
}