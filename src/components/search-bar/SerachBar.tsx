import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./search-bar.scss";

interface Props {
    setSearch: (search: string | null) => void,
    loadItems: (page: number) => Promise<void>,
    toggleTrash: () => void
}

interface State {
    search: string,
    listTrash: boolean
}

class SearchBar extends Component<Props, State>{
    constructor(props: Props) {
        super(props);

        this.state = {
            search: "",
            listTrash: false
        };
    }

    render = () => {
        return (
            <div className="bg-light search-bar">
                <div className="container-fluid d-flex justify-content-between align-items-center">

                    <form onSubmit={this.onSubmit}>
                        <div className="input-group">
                            <input type="text" name="buscar" className="form-control" placeholder="Buscar" value={this.state.search} onInput={({ currentTarget }) => this.setState({ search: currentTarget.value })} />
                            <button className="btn btn-outline-secondary" type="submit"><i className="fa fa-solid fa-magnifying-glass"></i></button>

                            {
                                this.state.search.length ?
                                    <button className="btn btn-outline-danger" onClick={this.onClickBtnClearSearch} type="button">
                                        {window.innerWidth > 767 ? "Limpar Busca" : <i className="fa fa-solid fa-xmark"></i>}
                                    </button> :
                                    <></>
                            }
                        </div>
                    </form>

                    <div className="d-flex">
                        <Link className="btn d-flex flex-column align-items-center" to="adicionar">
                            <i className="fa-solid fa-plus"></i>
                            {window.innerWidth > 767 ? "Adicionar" : ""}
                        </Link>

                        {
                            this.state.listTrash ?
                                (
                                    <button className="btn d-flex flex-column align-items-center" onClick={this.onClickBtnTrash}>
                                        <i className="fa-solid fa-arrow-left"></i>
                                        {window.innerWidth > 767 ? "Voltar" : ""}
                                    </button>
                                ) :
                                (
                                    <button className="btn d-flex flex-column align-items-center" onClick={this.onClickBtnTrash}>
                                        <i className="fa-solid fa-trash-can"></i>
                                        {window.innerWidth > 767 ? "Lixeira" : ""}
                                    </button>
                                )
                        }
                    </div>
                </div>
            </div>
        );
    }

    private onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        const { search } = this.state;
        const { setSearch, loadItems } = this.props;

        setSearch(search);
        setTimeout(() => loadItems(1), 16);
    }

    private onClickBtnClearSearch = () => {
        const { setSearch, loadItems } = this.props;

        this.setState({ search: "" });

        setSearch(null);
        setTimeout(() => loadItems(1), 16);
    }

    private onClickBtnTrash = () => {
        const { listTrash } = this.state;

        this.props.toggleTrash();
        this.setState({ listTrash: !listTrash });
    }
}

export default SearchBar;