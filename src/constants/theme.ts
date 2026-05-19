import { ActionIcon, Card, createTheme, Divider, Select, Tabs, Text, Textarea, Title, virtualColor, type MantineTheme } from "@mantine/core";
import {
    primaryLight,
    primaryDark,
    secondaryLight,
    secondaryDark,
    accentLight,
    accentDark,
    textLight,
    textDark,
    backgroundLight,
    backgroundDark,
    dividerLight,
    dividerDark,
    graphBackgroundDark,
    graphBackgroundLight,
    buttonLight,
    buttonDark,
} from "@/constants/blueTheme";
import { RichTextEditor } from "@mantine/tiptap";

export const getReactFlowColors = (colorScheme: "light" | "dark" | "auto", theme: MantineTheme) => ({
    primary: colorScheme === "dark" ? theme.colors.primaryDark[6] : theme.colors.primaryLight[6],
    secondary: colorScheme === "dark" ? theme.colors.secondaryDark[6] : theme.colors.secondaryLight[6],
    text: colorScheme === "dark" ? theme.colors.textDark[0] : theme.colors.textLight[0],
    background: colorScheme === "dark" ? theme.colors.backgroundDark[0] : theme.colors.backgroundLight[0],
    divider: colorScheme === "dark" ? theme.colors.dividerDark[0] : theme.colors.dividerLight[0],
    graphBackground: colorScheme === "dark" ? theme.colors.graphBackgroundDark[0] : theme.colors.graphBackgroundLight[0],
});

export const APP_THEME = createTheme({
    primaryColor: "primary",
    fontFamily: "Uthmani",
    fontFamilyMonospace: "Uthmani",
    fontSizes: {
        df: "2rem",
    },

    components: {
        Tabs: Tabs.extend({
            defaultProps: {
                ff: "Uthmani",
                c: "text",
                fz: "df",
            },
        }),
        Title: Title.extend({
            defaultProps: {
                ff: "Uthmani",
                fw: "normal",
                c: "text",
                fz: "df",
            },
        }),
        Text: Text.extend({
            defaultProps: {
                ff: "Uthmani",
                fz: "2rem",
                c: "text",
            },
        }),
        Card: Card.extend({
            defaultProps: {
                ff: "Uthmani",
                fz: "df",
                c: "text",
            },
        }),
        Select: Select.extend({
            defaultProps: {
                ff: "Uthmani",
                ta: "center",
                fz: "df",
            },
            styles: (theme) => ({
                input: {
                    fontSize: "df",
                    textAlign: "center",
                    textOverflow: "ellipsis",
                    direction: "rtl",
                    color: theme.colors.text[0],
                    background: theme.colors.graphBackground[0],
                },
                dropdown: {
                    border: "1px solid black",
                    fontFamily: "Uthmani",
                    direction: "rtl",
                    background: theme.colors.background[0],
                },
            }),
        }),
        Divider: Divider.extend({
            defaultProps: {
                bg: "divider",
                c: "divider",
            },
        }),
        ActionIcon: ActionIcon.extend({
            defaultProps: {
                bg: "button",
                c: "button",
                bd: "1px solid divider",
            },
        }),
        RichTextEditor: RichTextEditor.extend({
            defaultProps: {
                ff: "Uthmani",
                w: "100%",
                c: "text",
                fz: "df",
            },
            styles: (theme) => ({
                content: {
                    color: theme.colors.text[0],
                    fontSize: theme.fontSizes.df,
                    background: theme.colors.graphBackground[0],
                    border: `1px solid ${theme.colors.primary[0]}`,
                },
            }),
        }),

        Textarea: Textarea.extend({
            defaultProps: {
                ff: "Uthmani",
                autosize: true,
                minRows: 1,
                w: "100%",
                c: "text",
                fz: "df",
            },
            styles: (theme) => ({
                input: {
                    color: theme.colors.text[0],
                    fontSize: theme.fontSizes.df,
                    background: theme.colors.graphBackground[0],
                    border: `1px solid ${theme.colors.primary[0]}`,
                },
            }),
        }),
    },
    colors: {
        primaryLight: primaryLight,
        primaryDark: primaryDark,
        secondaryLight: secondaryLight,
        secondaryDark: secondaryDark,
        accentLight: accentLight,
        accentDark: accentDark,
        textLight: textLight,
        textDark: textDark,
        backgroundLight: backgroundLight,
        backgroundDark: backgroundDark,
        dividerLight: dividerLight,
        dividerDark: dividerDark,
        graphBackgroundLight: graphBackgroundLight,
        graphBackgroundDark: graphBackgroundDark,
        buttonLight: buttonLight,
        buttonDark: buttonDark,

        primary: virtualColor({
            name: "primary",
            dark: "primaryDark",
            light: "primaryLight",
        }),
        secondary: virtualColor({
            name: "secondary",
            dark: "secondaryDark",
            light: "secondaryLight",
        }),
        accent: virtualColor({
            name: "accent",
            dark: "accentDark",
            light: "accentLight",
        }),
        text: virtualColor({
            name: "text",
            dark: "textDark",
            light: "textLight",
        }),
        background: virtualColor({
            name: "background",
            dark: "backgroundDark",
            light: "backgroundLight",
        }),
        divider: virtualColor({
            name: "divider",
            dark: "dividerDark",
            light: "dividerLight",
        }),
        graphBackground: virtualColor({
            name: "graphBackground",
            dark: "graphBackgroundDark",
            light: "graphBackgroundLight",
        }),
        button: virtualColor({
            name: "button",
            dark: "buttonDark",
            light: "buttonLight",
        }),
    },
});

export const getFontSize = APP_THEME.fontSizes?.df;
