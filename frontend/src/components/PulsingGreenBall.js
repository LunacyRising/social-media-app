import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Badge, Tooltip } from "@material-ui/core";

const PulsingGreenBall = () => {

    const useStyles = makeStyles((theme) => ({

        badge: {
            position:"absolute",
            top: 15,
            left: 12,
            backgroundColor: '#44b700',
            color: '#44b700',
            width: 8,
            height: 8,
            borderRadius: "50%",
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            "@media(min-width: 769px)" : {
                width: 10,
                height: 10,
                left: 15,
              },
            '&::after': {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              animation: 'ripple 1.2s infinite ease-in-out',
              border: '1px solid currentColor',
              content: '""',
            },
          },
      }));
      const classes = useStyles();

      const {badge} = classes;

      const { t } = useTranslation();

    return (
        <>
            <Tooltip title={t("Online")} placement="top">
              <Badge
              className={badge}
              overlap="circle"
              anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
              }}
              variant="dot"
              />  
            </Tooltip>
        </>
    );
};

export default PulsingGreenBall;
