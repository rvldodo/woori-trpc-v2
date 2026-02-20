import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";

export const useModalState = () => {
  const [modal, setModal] = useQueryStates({
    create: parseAsBoolean.withDefault(false),
    success: parseAsBoolean.withDefault(false),
    update: parseAsString,
    delete: parseAsString,
    detail_manajemen: parseAsString,
  });

  const onChangeModal = (
    name: keyof typeof modal,
    value: (typeof modal)[keyof typeof modal],
  ) => {
    setModal((prev) => ({ ...prev, [name]: value }));
  };

  return { modal, onChangeModal };
};
