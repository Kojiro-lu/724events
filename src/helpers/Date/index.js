export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};

// On ajoute 1 pour faire correspondre avec les clés de l'objet MONTHS car getMonth commence à 0
export const getMonth = (date) => MONTHS[date.getMonth() + 1];
