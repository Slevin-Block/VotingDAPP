import { HStack, useRadioGroup } from "@chakra-ui/react"
import Radio from "../../Atoms/Radio/Radio"

const GroupRadio = (allProps) => {
    const {data, handleChange, ...props} = allProps
    const { getRadioProps } = useRadioGroup({
        name: 'framework',
        defaultValue: 'react',
        onChange: handleChange,
    })

    return (
        <HStack {...props}>
            {data.map((value) => {
                const radio = getRadioProps({ value })
                return (
                    <Radio key={value} {...radio}>
                        {value}
                    </Radio>
                )
            })}
        </HStack>
    )
}

export default GroupRadio;
