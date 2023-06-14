import { SideBar } from "../component/SideBar";
import { Navbar } from "../component/NavBar";
import {
  useDeleteCategory,
  useEditCategory,
  categoryhooks,
} from "../domain/categories";
import styled from "styled-components";
import { Header } from "./HomePage";
import { useFormik } from "formik";
import * as Yup from "yup";

type CategoryPageProps = {};

const Div = styled.div`
  display: grid;
  grid-template-columns: 15% 85%;
`;

const ContentWrapper = styled.div`
  display: grid;
  flex-flow: column;
`;

type CategoryForm =
  | {
      type: "add";
      selectedId: null;
      title: string;
    }
  | { type: "edit"; selectedId: number; title: string };

const defaultInputCategory: CategoryForm = {
  type: "add",
  selectedId: null,
  title: "",
};

export function CategoryPage(_props: CategoryPageProps) {
  const deleteCategory = useDeleteCategory();
  const editCategory = useEditCategory();
  const mengapa = categoryhooks();

  async function onInputCategory(props: CategoryForm) {
    if (props.type === "add") {
      await mengapa.useCreateCategory.mutate({ title: props.title });
      await inputCategory.setValues(defaultInputCategory);
      inputCategory.setErrors({});
      mengapa.useFetchCategory.refetch();
    } else if (props.type === "edit") {
      editCategory
        .updateCategory({ id: props.selectedId, title: props.title })
        .then(async () => {
          await inputCategory.setValues(defaultInputCategory);
          inputCategory.setErrors({});
          mengapa.useFetchCategory.refetch();
        });
    } else return;
  }
  const inputCategory = useFormik({
    initialValues: defaultInputCategory,
    validationSchema: Yup.object({
      type: Yup.string(),
      selectedId: Yup.number().nullable(),
      title: Yup.string()
        .required("Required")
        .max(30, "Must be 30 character or less"),
    }),
    onSubmit: (values) => {
      onInputCategory(values);
    },
  });

  return (
    <div>
      <Navbar></Navbar>
      <Div>
        <SideBar />
        <ContentWrapper>
          <div>
            <Header>Welcome to Category Page</Header>
            <form onSubmit={inputCategory.handleSubmit}>
              <label htmlFor="title">Category Name :</label>
              <input
                id="title"
                name="title"
                type="text"
                onChange={inputCategory.handleChange}
                onBlur={inputCategory.handleBlur}
                value={inputCategory.values.title}
              />
              {inputCategory.touched.title && inputCategory.errors.title ? (
                <>
                  <span>{inputCategory.errors.title}</span>
                  <br />
                </>
              ) : null}
              <button type="submit">
                {inputCategory.values.type === "add" ? "Add" : "Update"}
              </button>
              <button
                type="button"
                onClick={async () => {
                  await inputCategory.setValues(defaultInputCategory);
                  inputCategory.setErrors({});
                }}
              >
                {inputCategory.values.type === "add" ? "Clear Input" : "Cancel"}
              </button>
            </form>
          </div>
          {(function () {
            if (mengapa.useFetchCategory.isLoading) {
              return <p>Data is Loading</p>;
            } else if (
              mengapa.useFetchCategory.error ||
              deleteCategory.errorMessage ||
              editCategory.errorMessage
            ) {
              return (
                <p>
                  {deleteCategory.errorMessage || editCategory.errorMessage}
                </p>
              );
            } else if (mengapa.useFetchCategory.data?.length === 0) {
              return <p>Data Empty</p>;
            } else {
              return (
                <table
                  style={
                    inputCategory.values.type === "edit"
                      ? { display: "none" }
                      : { display: "table" }
                  }
                >
                  <thead>
                    <tr>
                      <th>ID Category</th>
                      <th>Title</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mengapa.useFetchCategory.data?.map((category) => {
                      return (
                        <tr key={category.id}>
                          <td>{category.id}</td>
                          <td>{category.title}</td>
                          <td>
                            <input
                              type="button"
                              value="Delete"
                              disabled={deleteCategory.isLoading}
                              onClick={() =>
                                deleteCategory
                                  .delCategory({
                                    id: category.id,
                                    title: category.title,
                                  })
                                  .then(() =>
                                    mengapa.useFetchCategory.refetch()
                                  )
                              }
                            ></input>
                            <input
                              type="button"
                              value="Edit"
                              disabled={editCategory.isLoading}
                              onClick={() => {
                                inputCategory.setValues({
                                  selectedId: category.id,
                                  title: category.title,
                                  type: "edit",
                                });
                              }}
                            ></input>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              );
            }
          })()}
        </ContentWrapper>
      </Div>
    </div>
  );
}
