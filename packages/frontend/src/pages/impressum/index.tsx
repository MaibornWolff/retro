import React from "react";
import { AppBar, Box, Toolbar, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { ToggleThemeButton } from "../../common/components/buttons/ToggleThemeButton";

const Index = () => {
  const theme = useTheme();
  return (
    <>
      <AppBar
        position="static"
        enableColorOnDark={true}
        sx={{ backgroundColor: theme.palette.background.paper }}
      >
        <Toolbar>
          <Typography
            variant="h4"
            flexGrow={1}
            fontFamily="Permanent"
            sx={{ fontFamily: "Permanent Marker, cursive" }}
          >
            <Link href="/" style={{ textDecoration: "none", color: theme.palette.primary.main }}>
              Retro
            </Link>
          </Typography>
          <ToggleThemeButton />
        </Toolbar>
      </AppBar>
      <Box sx={{ maxWidth: "80%", justifyContent: "center" }}>
        <Typography variant="h1">Impressum</Typography>
        <Typography variant="h2">MaibornWolff GmbH Theresienhöhe 13 80339 München</Typography>
        <Typography variant="body1">
          Telefon: +49 89 544 253 000
          <br />
          Telefax: +49 89 544 253 099
          <br />
          <br />
          E-Mail: info@maibornwolff.de
          <br />
          Internet: www.maibornwolff.de
          <br />
          <br />
          Registergericht: Amtsgericht München
          <br />
          Registernummer: HRB 98058
          <br />
          USt.-Identifikations-Nr. DE 129 299 525
          <br />
          DUNS-Nummer 341155000
          <br />
          <br />
          Inhaltlich Verantwortlicher gemäß § 6 MDStV und ViSdPG: Holger Wolff
          <br />
          <br />
          Haftungshinweis: Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung
          für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich
          deren Betreiber verantwortlich.
          <br />
          <br />
          Mit Urteil vom 12.5.1998 – AZ 312 O 85/98 – hat das Landgericht Hamburg entschieden, dass
          ein Sitebetreiber durch die Verwendung von verknüpfenden Links die Inhalte dieser
          gelinkten Seiten mit zu verantworten hat. Das kann, so das LG Hamburg, nur dadurch
          verhindert werden, dass man sich ausdrücklich von diesen Inhalten distanziert. Da wir
          keinen Einfluß auf Gestaltung und Inhalte der verlinkten Seiten haben, distanzieren wir
          uns hiermit ausdrücklich von diesen Seiten und Inhalten. Diese Erklärung gilt für alle auf
          unserer Homepage angebrachten Links und für alle Inhalte der Seiten, zu denen Links
          führen.
          <br />
          <br />
          Diese Website verwendet Matomo Cloud Analytics, einen Webanalysedienst der InnoCraft Ltd.
          Die Erhebung von Daten über das Nutzerverhalten auf dieser Website erfolgt über
          First-Party-Cookies; alle erhobenen Daten werden auf AWS-Servern in der EU gespeichert und
          stehen ausschließlich dem Websitebetreiber zur Verfügung. IP-Adressen und User-IDs werden
          anonymisiert erfasst. Eine Verwendung der Nutzerdaten durch InnoCraft erfolgt nicht, es
          findet keine Datenweitergabe an Dritte statt. Eine Ablehnung der Datenerhebung hat keine
          Auswirkungen auf die Funktionsweise dieser Website.
          <br />
          <br />
          Bilder von: Fernando Terry, Philippe Schrettenbrunner, Alexandra Mesmer, Maiborn Wolff
          GmbH, Adobe Stock, Kraftwerk
          <br />
          <br />
          Geschäftsführer: Volker Maiborn, Holger Wolff, Alexander Hofmann, Florian Theimer, Marcus
          Adlwart, Dr. Martina Beck, Christian Loos
        </Typography>
      </Box>
    </>
  );
};

export default Index;
