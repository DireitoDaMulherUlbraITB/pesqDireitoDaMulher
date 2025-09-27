export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full h-screen space-y-6 p-6 bg-white">{children}</div>;
};

export const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full items-center justify-between">{children}</div>
  );
};

export const PageHeaderContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="w-full space-y-1">{children}</div>;
};

export const PageTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-[#760d11] text-xl text-center font-bold">
      {children}
    </div>
  );
};

export const PageDescription = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="text-[#760d11] text-md font-extralight text-center">
      {children}
    </div>
  );
};

export const PageActions = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center gap-2">{children}</div>;
};

export const PageContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-6">{children}</div>;
};

export const PageFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center text-center">
      {children}
    </div>
  );
};
