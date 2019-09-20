export default {
    methods: {
        init({ form }) {
            const type = form.field('person_id').value || this.$route.params.type === 'person'
                ? 'person'
                : 'company';
            form.field('company_id').meta.hidden = type === 'person';
            form.field('person_id').meta.hidden = type === 'company';
        },
    },
};
