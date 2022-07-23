# 构件属性值筛选器
def property_filter(element_info, element_num):
    material, floor, category_id, category_name, family, family_type, size = '', '', '', '', '', '', ''
    basic_property, size_data, material_data = {}, {}, {}
    # 三维中心坐标
    gt_x = (element_info['data']['boundingBox']['max']['x'] + element_info['data']['boundingBox']['min']['x']) / 2.0
    gt_y = (element_info['data']['boundingBox']['max']['y'] + element_info['data']['boundingBox']['min']['y']) / 2.0
    gt_z = (element_info['data']['boundingBox']['max']['z'] + element_info['data']['boundingBox']['min']['z']) / 2.0
    center_gt = f"({gt_x}, {gt_y}, {gt_z})"
    # 构件ID
    element_id = element_info['data']['elementId']
    # 构件名称
    element_name = element_info['data']['name']
    for i in element_info['data']['properties']:
        if i['group'] == '基本属性':
            basic_property = i['items']
        elif i['group'] == '尺寸标注':
            size_data = i['items']
        elif i['group'] == '材质和装饰':
            material_data = i['items']
    for i in basic_property:
        if i['key'] == 'floor':  # 楼层
            floor = i['value']
        elif i['key'] == 'categoryId':  # 类别ID
            category_id = i['value']
        elif i['key'] == 'categoryName':  # 类别名称
            category_name = i['value']
        elif i['key'] == 'family':  # 族
            family = i['value']
        elif i['key'] == 'familyType':  # 族类型
            family_type = i['value']
    for i in size_data:
        if i['value'] != '':
            size += i['key'] + ":" + i['value'] + "  "
        else:
            pass
    for i in material_data:
        if '材质' in i['key']:  # 结构材质
            if i['value'] != '':
                material += i['value'] + ' '
            else:
                pass
    if material == '':
        material = "未标注材质"
    # 构件属性
    element_property = {'element_id': element_id, 'floor': floor, 'category_id': category_id, 'category_name': category_name,
                        'family': family, 'family_type': family_type, 'element_name': element_name, 'material': material,
                        'size': size, 'center_gt': center_gt, 'element_num': element_num}
    return element_property
