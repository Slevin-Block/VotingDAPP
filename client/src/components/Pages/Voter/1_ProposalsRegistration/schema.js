import * as yup from "yup";

export const getSchema = (data) => {
    return yup.object({
        proposal: yup
            .string()
            .test(  'already','Proposition déjà existante',
                value => !data
                            .map(item => item.toLowerCase())
                            .includes(value.toLowerCase())
            )
            .required('Veuillez renseigner une proposition.')
    }).required();
}