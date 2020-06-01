import { FunctionComponent, FormEvent } from "react";
import { Button, makeStyles } from "@material-ui/core";

interface FormLayoutProps {
  handleSubmit(e: FormEvent<HTMLFormElement>): void;
  buttonLabel?: string;
}

const useStyles = makeStyles((_theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "60%",
    margin: "auto",
  },
  submitButton: {
    margin: "30px auto 0 auto ",
    maxWidth: "250px",
    width: "50%",
  },
}));

const FormLayout: FunctionComponent<FormLayoutProps> = ({
  children,
  handleSubmit,
  buttonLabel = "submit",
}) => {
  const classes = useStyles();
  return (
    <form className={classes.formContainer} onSubmit={handleSubmit}>
      {children}
      <Button
        className={classes.submitButton}
        type="submit"
        variant="contained"
        color="primary"
      >
        {buttonLabel}
      </Button>
    </form>
  );
};

export default FormLayout;
