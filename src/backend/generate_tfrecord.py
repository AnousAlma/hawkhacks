# generate_tfrecord.py
import os
import glob
import pandas as pd
import tensorflow as tf
from lxml import etree
from object_detection.utils import dataset_util

def xml_to_csv(path):
    xml_list = []
    for xml_file in glob.glob(path + '/*.xml'):
        tree = etree.parse(xml_file)
        root = tree.getroot()
        for member in root.findall('object'):
            value = (root.find('filename').text,
                     int(root.find('size/width').text),
                     int(root.find('size/height').text),
                     member[0].text,
                     int(member.find('bndbox/xmin').text),
                     int(member.find('bndbox/ymin').text),
                     int(member.find('bndbox/xmax').text),
                     int(member.find('bndbox/ymax').text)
                     )
            xml_list.append(value)
    column_name = ['filename', 'width', 'height', 'class', 'xmin', 'ymin', 'xmax', 'ymax']
    xml_df = pd.DataFrame(xml_list, columns=column_name)
    return xml_df

def class_text_to_int(row_label):
    # Modify this function to match your class names
    if row_label == 'hello':
        return 1
    elif row_label == 'i love you':
        return 2
    elif row_label == 'no':
        return 3
    elif row_label == 'thank you':
        return 5
    elif row_label == 'yes':
        return 6
    else:
        return None

def create_tf_example(group, path):
    with tf.io.gfile.GFile(os.path.join(path, '{}'.format(group.filename)), 'rb') as fid:
        encoded_jpg = fid.read()
    width = group.width
    height = group.height

    filename = group.filename.encode('utf8')
    image_format = b'jpg'
    xmins = []
    xmaxs = []
    ymins = []
    ymaxs = []
    classes_text = []
    classes = []

    for index, row in group.object.iterrows():
        xmins.append(row['xmin'] / width)
        xmaxs.append(row['xmax'] / width)
        ymins.append(row['ymin'] / height)
        ymaxs.append(row['ymax'] / height)
        classes_text.append(row['class'].encode('utf8'))
        classes.append(class_text_to_int(row['class']))

    tf_example = tf.train.Example(features=tf.train.Features(feature={
        'image/height': dataset_util.int64_feature(height),
        'image/width': dataset_util.int64_feature(width),
        'image/filename': dataset_util.bytes_feature(filename),
        'image/source_id': dataset_util.bytes_feature(filename),
        'image/encoded': dataset_util.bytes_feature(encoded_jpg),
        'image/format': dataset_util.bytes_feature(image_format),
        'image/object/bbox/xmin': dataset_util.float_list_feature(xmins),
        'image/object/bbox/xmax': dataset_util.float_list_feature(xmaxs),
        'image/object/bbox/ymin': dataset_util.float_list_feature(ymins),
        'image/object/bbox/ymax': dataset_util.float_list_feature(ymaxs),
        'image/object/class/text': dataset_util.bytes_list_feature(classes_text),
        'image/object/class/label': dataset_util.int64_list_feature(classes),
    }))
    return tf_example

def main(_):
    for folder in ['train', 'test']:
        writer = tf.io.TFRecordWriter(f'dataset/{folder}.record')
        path = os.path.join(os.getcwd(), f'dataset/{folder}/images')
        examples = xml_to_csv(f'dataset/{folder}/annotations')
        grouped = examples.groupby('filename')
        for group in grouped:
            tf_example = create_tf_example(group, path)
            writer.write(tf_example.SerializeToString())
        writer.close()
        print(f'Successfully created the TFRecord file: dataset/{folder}.record')

if __name__ == '__main__':
    tf.compat.v1.app.run()
