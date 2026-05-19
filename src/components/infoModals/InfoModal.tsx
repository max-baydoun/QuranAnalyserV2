import { Divider, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, ModalRoot, ModalTitle, Stack, Text, Title } from "@mantine/core";
import modals from "@/assets/infoModalContents.json";

export default function InfoModal({ opened, close, id }: { opened: boolean; close: () => void; id: number }) {
    const modalObject = modals.find((modal) => modal.modalId === id);
    return (
        <ModalRoot size={"xl"} opened={opened} onClose={close} centered>
            <ModalOverlay />
            <ModalContent bg={"background"}>
                <ModalHeader bg={"background"}>
                    <ModalTitle>
                        <Title order={1}>{modalObject?.modalHeading}</Title>
                    </ModalTitle>
                    <ModalCloseButton />
                </ModalHeader>
                <Divider />
                <ModalBody p={10}>
                    <Stack>
                        {modalObject?.modalText.map((p) => (
                            <Text fz={"1.5rem"}>{p}</Text>
                        ))}
                    </Stack>
                </ModalBody>
            </ModalContent>
        </ModalRoot>
    );
}
