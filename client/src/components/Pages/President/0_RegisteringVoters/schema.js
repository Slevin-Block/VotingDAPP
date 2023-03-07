import * as yup from "yup";

export const getSchema = (data) => {
    return yup.object({
        address: yup
            .string()
            .test('already','Login déjà existant', value => !data.includes(value.toLowerCase()))
            .required('Veuillez renseigner une adresse.')
            .matches(/^0x[0-9a-fA-F]{40}$/i, "Format de clé publique erroné."),
    }).required();
}