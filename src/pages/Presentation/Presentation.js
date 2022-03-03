import file from "../../assets/docs/presentationM2L.pdf"

const Presentation = () => {
  
  return (
    <iframe
    src={file}
    title="file"
    style={{ width: '100%', height: '100%' }} 
    />
  )  
}

export default Presentation;