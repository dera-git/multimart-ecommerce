import React, { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase.confing";
import { collection, addDoc } from "firebase/firestore";
import useGetData from "../custom-hooks/useGetData";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const AddCategory = () => {
  const [categorieName, setCategorieName] = useState("");
  const [categorieSlug, setCategorieSlug] = useState("");
  const [categorieDescription, setCategorieDescription] = useState("");
  const { data: categoryData } = useGetData('categories');

  const submitFormCategorie = async (e) => {
    e.preventDefault();

    try {
      const categorieRef = await collection(db, "categories");
      addDoc(categorieRef, {
        category: categorieName,
        categorySlug: categorieSlug,
        categoryDescription: categorieDescription,
      });

      toast.success("Categorie successfully added");
      setCategorieName("");
      setCategorieSlug("");
      setCategorieDescription("");
    } catch (error) {
      toast.error("Categorie not added!");
    }
  };

  return (
    <section className="mt-5 pt-3">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={submitFormCategorie}>
              <div className="mb-3">
                <label htmlFor="#categorie-name" className="mb-2">
                  Categorie name
                </label>
                <input
                  type="text"
                  id="categorie-name"
                  value={categorieName}
                  onChange={(e) => setCategorieName(e.target.value)}
                  className="form-control"
                  placeholder="Categorie name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="#categorie-slug" className="mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  id="categorie-slug"
                  value={categorieSlug}
                  onChange={(e) => setCategorieSlug(e.target.value)}
                  className="form-control"
                  placeholder="Categorie slug"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="#categorie-description" className="mb-2">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="categorie-description"
                  defaultValue={categorieDescription}
                  onChange={(e) => setCategorieDescription(e.target.value)}
                  cols="30"
                  rows="5"
                ></textarea>
              </div>
              <button className="ec-btn px-3 py-2 mt-4">Add Categorie</button>
            </form>
          </div>
          <div className="col-lg-6">
            <table className='table'>
              <thead>
                <tr>
                  <th>Categorie</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categoryData?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.category}</td>
                    <td>
                      <Link>View</Link>
                      <Link className="btn cursor-pointer">
                        <MdEdit color={"green"} fontSize={20} />
                      </Link>
                      <button className="btn cursor-pointer">
                        <MdDelete color={"red"} fontSize={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddCategory;
