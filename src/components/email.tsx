import { translate } from '@/lib/utils';

const styles = `
color: white;
border: none;
font-weight: 500; 
padding-left: 1rem;
padding-top: 0.5rem;
font-size: 0.875rem;
padding-right: 1rem; 
align-items: center; 
white-space: nowrap; 
line-height: 1.25rem; 
display: inline-flex; 
padding-bottom: 0.5rem; 
border-radius: 0.375rem; 
background-color: black;
justify-content: center; 
transition-duration: 300ms;
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); 
transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
`;

const center = `
color: black;
background-color: red;
display: flex;
flex-direction: column; 
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
`;

const x = `<html>
<head>
  <style type="text/css">
    * {
      font-family: Inter, sans-serif;
    }

    table,
    tr,
    td {
      vertical-align: top;
      border-collapse: collapse;
    }

    p {
      margin: 0;
    }

    .ie-container table,
    .mso-container table {
      table-layout: fixed;
    }

    table,
    td {
      color: #000;
    }
  </style>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
    rel="stylesheet"
    type="text/css"
  />
</head>

<body>
  <table width="100%">
    <tbody>
      <tr>
        <td align="left">
          <h1 style="text-align: center">
            <span>
              <strong> Réinitialisez votre mot de passe </strong>
            </span>
          </h1>
        </td>
      </tr>
    </tbody>
  </table>

  <table width="100%">
    <tbody>
      <tr>
        <td align="left">
          <div align="center">
            <a href="https://myflair.vercel.app/auth/forgot-password/{{uuid}}" target="_blank" style="text-decoration: none">
              <span
                style="
                  border-radius: 0.375rem;
                  padding: 10px 20px;
                  line-height: 120%;
                  color: white;
                  border: none;
                  font-weight: 500;
                  padding-left: 1rem;
                  padding-top: 0.5rem;
                  font-size: 0.875rem;
                  padding-right: 1rem;
                  align-items: center;
                  white-space: nowrap;
                  line-height: 1.25rem;
                  display: inline-flex;
                  padding-bottom: 0.5rem;
                  border-radius: 0.375rem;
                  background-color: black;
                  justify-content: center;
                  transition-duration: 300ms;
                  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
                    0 1px 2px 0 rgba(0, 0, 0, 0.06);
                  transition-property: color, background-color, border-color,
                    text-decoration-color, fill, stroke;
                "
              >
                Réinitialiser
              </span>
            </a>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
`;

export const ForgotPassword = (uuid: string) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: x.replace('{{uuid}}', uuid) }}
    ></div>
    /*     <div style={translate(center)}>
      <h1 style={{ display: "block" }}>Réinitialisez votre mot de passe !</h1>
      <a style={{ display: "white" }}
        href={`https://myflair.vercel.app/auth/forgot-password/${uuid}`}
        target="_blank"
      >
        <button className="btn" style={translate(styles)}>
          Réinitialiser
        </button>
      </a>
    </div> */
  );
};

export const EmailVerification = (otp: string) => {
  return (
    <div
      style={{
        ...translate(center),
        backgroundColor: 'white',
        color: 'black',
      }}
    >
      <h1>Vérifiez votre e-mail</h1>
      <h2>{otp}</h2>
    </div>
  );
};
