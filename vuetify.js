import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#2F80ED",
                table_header: "#CBE0EF",
                table_header2: '#E5E7EF',
                secondary: "#50AB26",
                background: "#f6f7fa",
                field_color: "#194E76",
                success: "#27AE60",
                error: "#D7443E",
                warning: "#F18324",
            }
        }
    }
});
