import InfoModal from "@/components/infoModals/InfoModal";
import { ActionIcon, Badge, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle } from "@tabler/icons-react";

export default function PanelHeading({ title, id }: { title: string; id: number }) {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <Group style={{ display: "flex", alignItems: "center", justifyContent: "right" }}>
            <InfoModal opened={opened} close={close} id={id} />

            <ActionIcon c={"text"} bd={"none"} bg={"background"} onClick={open}>
                <IconInfoCircle />
            </ActionIcon>
            <Badge size="xl" p={20} bg={"graphBackground"} bd={"1px solid divider"}>
                <Title order={1} ta={"right"}>
                    {title}
                </Title>
            </Badge>
        </Group>
    );
}
