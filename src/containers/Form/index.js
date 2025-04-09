import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);

  // État unique pour gérer tous les champs du formulaire
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    message: "",
    type: "",
  });

  // Fonction générique pour gérer les champs input/textarea
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fonction spécifique pour gérer le changement dans le Select
  const handleSelectChange = (newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      type: newValue,
    }));
  };

  const resetForm = () => {
    setFormData({
      lastName: "",
      firstName: "",
      email: "",
      message: "",
      type: "",
    });
  };

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      try {
        await mockContactApi();
        setSending(false);
        onSuccess(); // Notifie le parent que l'envoi a réussi
        resetForm(); // Réinitialise les champs après envoi
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field
            name="lastName"
            placeholder=""
            label="Nom"
            value={formData.lastName}
            onChange={handleChange}
          />
          <Field
            name="firstName"
            placeholder=""
            label="Prénom"
            value={formData.firstName}
            onChange={handleChange}
          />
          <Select
            name="type"
            selection={["Personel", "Entreprise"]}
            onChange={handleSelectChange}
            value={formData.type}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field
            name="email"
            placeholder=""
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            name="message"
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            value={formData.message}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
