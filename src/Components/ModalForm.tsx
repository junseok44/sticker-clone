import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";

const ModalForm = ({
  title,
  content,
  children,
  cancelFunction,
  confirmFunction,
}: {
  title: string;
  children: JSX.Element;
  content?: string;
  cancelFunction?: React.Dispatch<React.SetStateAction<boolean>>;
  confirmFunction?: () => void;
}) => {
  return (
    <>
      <Card
        sx={{ width: 345, zIndex: 100 }}
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader title="카테고리 설정"></CardHeader>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {content}
            {children}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            onClick={(e) => {
              if (cancelFunction) cancelFunction(false);
            }}
          >
            취소
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (confirmFunction) confirmFunction();
            }}
          >
            확인
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ModalForm;
