from sqlalchemy.orm import class_mapper


def _model2dict(model):
    if not model:
        return {}

    fields = class_mapper(model.__class__).columns.keys()
    return dict((col, getattr(model, col)) for col in fields)


def model_to_dict(model):
    if not model:
        return {}

    return _model2dict(model)


def models_to_list(models):
    if not models:
        return []
    return [model_to_dict(model) for model in models]
