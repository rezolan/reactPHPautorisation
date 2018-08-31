import React from 'react';

String.prototype.lessThan = function (max) {
    let tmp = this;
    for(let i = this.length; i >= max; i--) {
        tmp = tmp.slice(0, -1);
    }
    return tmp;
};

export default class Post extends React.Component {

    constructor(props) {
        super(props);

        this.handleShowMore = this.handleShowMore.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleView = this.handleView.bind(this);
    }

    handleShowMore() {
        this.props.updateContentToggler(this.props.index);
    };

    contentView = (content) => {
        if(!this.props.data.contentToggle && content.length > 120) {
            return content.lessThan(200) + '... ';
        } else {
            return content;
        }
    };

    handleEdit() {
        this.props.edit(String(this.props.index));
    }
    
    handleDelete() {
        this.props.delete(this.props.index);
    }
    
    handleView() {
        this.props.push(`/post-${this.props.index}`);
    }

    render() {
        return (
            <article className={this.props.data.contentToggle ? "item active" : "item"}>
                <h1 className="post-title">{this.props.data.title}</h1>
                <p>{this.contentView(this.props.data.description)}</p>
                <ul className="links">
                    {(this.props.data.links) ? this.props.data.links.map((item, index) =>
                        <li key={index} className="link"><a href={item.link} target="_blank">{item.title}</a></li>) : null}
                </ul>
               <div className="buttons">
                    <button onClick={this.handleShowMore}>{!this.props.data.contentToggle ? "Show more" : "Show less"}</button>
                    <button onClick={this.handleDelete}>Delete</button>
                    <button onClick={this.handleEdit}>Edit</button>
                    <button onClick={this.handleView}>View</button>
               </div>
            </article>
        );
    }
}