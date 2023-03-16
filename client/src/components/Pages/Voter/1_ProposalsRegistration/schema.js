import * as yup from "yup";

export const getSchema = (data) => {
    return yup.object({
        proposal: yup
            .string()
            .test(  'already','Proposition déjà enregistrée (par vous ou un autre votant).',
                value => !data
                            .map(item => item.toLowerCase())
                            .includes(value.toLowerCase())
            )
            .max(30, '30 caractères maximum')
            .required('Veuillez renseigner une proposition.')
    }).required();
}