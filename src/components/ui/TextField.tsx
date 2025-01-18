import { Box, TextField as RadixTextField } from "@radix-ui/themes";

type TextFieldProps = RadixTextField.RootProps & {
    prefix?: React.ReactNode;
    postFix?: React.ReactNode;
}

const TextField = ({ prefix, postFix, className, ...props}: TextFieldProps) => {
    return (
        <Box>
            <RadixTextField.Root className={className} {...props}>
                {prefix && (
                    <RadixTextField.Slot>
                        {prefix}
                    </RadixTextField.Slot>
                )}
            </RadixTextField.Root>
            {postFix && (
                <RadixTextField.Slot>
                    {postFix}
                </RadixTextField.Slot>
            )}
        </Box>
    )
}

export default TextField;