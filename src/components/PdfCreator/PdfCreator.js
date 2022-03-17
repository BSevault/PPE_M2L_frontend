import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import "../ButtonBasic/ButtonBasic.css";
import { useAuth } from "../contexts/AuthContext";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfCreator = ({ allPayments, resaSalle }) => {
    const { user } = useAuth();
    const header = {
        text: `Facture concernant la salle ${resaSalle.nom} - ${resaSalle.date_resa}`,
        style: "subheader",
        margin: [0, 50, 0, 8]
    };

  const rows = [
    [
      { text: "Nom produit", style: "tableHeader"},
      { text: "Quantité", style: "tableHeader" },
      { text: "Total (€)", style: "tableHeader" },
    ],
  ];
  let total=0;

  allPayments?.forEach((paiement) => {
    rows.push([
      `${paiement.nom_produit}`,
      `${paiement.qte}`,
      `${paiement.total}`,
    ]);
    total = (total + paiement.total);
  });

  rows.push([{ text: "Total", colSpan: 2}, ``, { text: `${total.toFixed(2)}`}])

  var dd = {
    content: [
      { text: "Maison des Ligues de Lorraine", style: "header" },
      { text: "12 avenue de Lorraine,", style: "header" },
      { text: "57000 METZ", style: "header" },
      { text: `${user.prenom} ${user.nom}`, alignment: 'right', margin: [0, 20, 0, 8], style: "tableHeader"},
      { text: `${user.email}`, alignment: 'right', style: "tableHeader"},
 
      header,
      "Voici les différents produits commandé lors de la réunion",
      {
        style: "tableExample",
        table: {
          widths: [200, 100, 100],
          body: rows,
        },
      },
    ],

    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 2],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "black",
      },
    },
  };

  const downloadPDF = () => {
    pdfMake.createPdf(dd).open();
  };

  return (
    <div className="pdf_creator">
      <button className={`button-basic`} value="dow" onClick={downloadPDF}>
        Download PDF
      </button>
    </div>
  );
};

export default PdfCreator;
