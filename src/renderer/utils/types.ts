type PageComponentProps = {
  changeAction: (action: (path: string) => void) => void;
};
type PageComponentFC = React.FC<PageComponentProps>;
