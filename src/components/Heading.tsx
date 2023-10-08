type HeadingProps = {
  content: string | JSX.Element;
};

export const Heading = ({ content }: HeadingProps) => {
  return <div className="container-fluid heading">{content}</div>;
};

export default Heading;
