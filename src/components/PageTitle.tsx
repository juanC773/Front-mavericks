interface PageTitleProps {
  title: string;
}

function PageTitle({ title }: PageTitleProps) {
  return (
    <div className="title_users">
      <h1 className="title">{title}</h1>
    </div>
  );
}

export default PageTitle;
