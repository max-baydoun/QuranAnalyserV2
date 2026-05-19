import {
    ActionIcon,
    Box,
    Divider,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    ModalRoot,
    ModalTitle,
    Stack,
    Text,
    Title,
    useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export default function SettingsModal({ opened, close }: { opened: boolean; close: () => void }) {
    const { colorScheme, clearColorScheme, toggleColorScheme } = useMantineColorScheme();
    return (
        <ModalRoot size={"md"} opened={opened} onClose={close} centered>
            <ModalOverlay />
            <ModalContent bg={"background"}>
                <ModalHeader bg={"background"}>
                    <ModalTitle>
                        <Title order={1}>Settings</Title>
                    </ModalTitle>
                    <ModalCloseButton />
                </ModalHeader>
                <Divider />
                <ModalBody p={10}>
                    <Stack bd={"1px solid divider"} p={10} style={{ borderRadius: "10px" }}>
                        <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Text fz="md" c="text">
                                Toggle light/dark mode
                            </Text>
                            <ActionIcon
                                variant="filled"
                                size={"md"}
                                onClick={() => {
                                    clearColorScheme();
                                    toggleColorScheme();
                                }}
                                c={"accent"}
                            >
                                {colorScheme === "dark" ? <IconSun /> : <IconMoon />}
                            </ActionIcon>
                        </Box>
                        {/* <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 5 }}>
                            <Text fz="xl" c="text">
                                Text size
                            </Text>
                            <Slider
                                defaultValue={parseInt(theme.fontSizes.df.split("r")[0])}
                                w={"40%"}
                                marks={[
                                    { value: 1, label: "sm" },
                                    { value: 2, label: "md" },
                                    { value: 3, label: "lg" },
                                ]}
                                min={1}
                                max={3}
                                onChange={updateCSSFontSize}
                            />
                        </Box> */}
                    </Stack>
                </ModalBody>
            </ModalContent>
        </ModalRoot>
    );
}
